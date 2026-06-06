import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getApprovals } from "../../services/approvalService";

import {
  createPurchaseOrder,
  getPurchaseOrders,
} from "../../services/purchaseOrderService";

const PurchaseOrders = () => {
  const [approvals, setApprovals] = useState([]);
  const [purchaseOrders, setPurchaseOrders] =
    useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchApprovals();
    fetchPurchaseOrders();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await getApprovals();

      const approvedOnly =
        res.approvals.filter(
          (item) =>
            item.status === "approved"
        );

      setApprovals(approvedOnly);
    } catch (error) {
      toast.error(
        "Failed to load approvals"
      );
    }
  };

  const fetchPurchaseOrders =
    async () => {
      try {
        const res =
          await getPurchaseOrders();

        setPurchaseOrders(
          res.purchaseOrders
        );
      } catch (error) {
        toast.error(
          "Failed to load purchase orders"
        );
      }
    };

  const onSubmit = async (data) => {
    try {
      await createPurchaseOrder(data);

      toast.success(
        "Purchase Order Created"
      );

      reset();

      fetchPurchaseOrders();
    } catch (error) {
      toast.error(
        "Failed to create purchase order"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Purchase Orders
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Purchase Order
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            {...register("approvalId")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Approval
            </option>

            {approvals.map(
              (approval) => (
                <option
                  key={approval._id}
                  value={
                    approval._id
                  }
                >
                  {
                    approval
                      .quotationId
                      ?.vendorId
                      ?.companyName
                  }
                  {" - ₹"}
                  {
                    approval
                      .quotationId
                      ?.price
                  }
                </option>
              )
            )}
          </select>

          <input
            type="text"
            placeholder="PO Number"
            {...register(
              "poNumber"
            )}
            className="border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg md:col-span-2"
          >
            Create Purchase Order
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Purchase Order List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">
                  PO Number
                </th>

                <th className="border p-3">
                  RFQ
                </th>

                <th className="border p-3">
                  Vendor
                </th>

                <th className="border p-3">
                  Price
                </th>

                <th className="border p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {purchaseOrders.map(
                (po) => (
                  <tr
                    key={po._id}
                  >
                    <td className="border p-3">
                      {
                        po.poNumber
                      }
                    </td>

                    <td className="border p-3">
                      {
                        po
                          .approvalId
                          ?.quotationId
                          ?.rfqId
                          ?.title
                      }
                    </td>

                    <td className="border p-3">
                      {
                        po
                          .approvalId
                          ?.quotationId
                          ?.vendorId
                          ?.companyName
                      }
                    </td>

                    <td className="border p-3">
                      ₹
                      {
                        po
                          .approvalId
                          ?.quotationId
                          ?.price
                      }
                    </td>

                    <td className="border p-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {
                          po.status
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {purchaseOrders.length ===
            0 && (
            <p className="text-center py-6 text-slate-500">
              No Purchase Orders Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;