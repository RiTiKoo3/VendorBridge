import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getPurchaseOrders } from "../../services/purchaseOrderService";

import {
  createInvoice,
  getInvoices,
} from "../../services/invoiceService";

const Invoices = () => {
  const [purchaseOrders, setPurchaseOrders] =
    useState([]);

  const [invoices, setInvoices] =
    useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchPurchaseOrders();
    fetchInvoices();
  }, []);

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

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();

      setInvoices(res.invoices);
    } catch (error) {
      toast.error(
        "Failed to load invoices"
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      await createInvoice(data);

      toast.success(
        "Invoice Created"
      );

      reset();

      fetchInvoices();
    } catch (error) {
      toast.error(
        "Failed to create invoice"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Invoice Management
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Invoice
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            {...register("purchaseOrderId")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Purchase Order
            </option>

            {purchaseOrders.map((po) => (
              <option
                key={po._id}
                value={po._id}
              >
                {po.poNumber}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Invoice Number"
            {...register(
              "invoiceNumber"
            )}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Amount"
            {...register("amount")}
            className="border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg md:col-span-2"
          >
            Create Invoice
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Invoice List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">
                  Invoice Number
                </th>

                <th className="border p-3">
                  PO Number
                </th>

                <th className="border p-3">
                  Vendor
                </th>

                <th className="border p-3">
                  Amount
                </th>

                <th className="border p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {invoices.map(
                (invoice) => (
                  <tr
                    key={invoice._id}
                  >
                    <td className="border p-3">
                      {
                        invoice.invoiceNumber
                      }
                    </td>

                    <td className="border p-3">
                      {
                        invoice
                          .purchaseOrderId
                          ?.poNumber
                      }
                    </td>

                    <td className="border p-3">
                      {
                        invoice
                          .purchaseOrderId
                          ?.approvalId
                          ?.quotationId
                          ?.vendorId
                          ?.companyName
                      }
                    </td>

                    <td className="border p-3">
                      ₹
                      {invoice.amount}
                    </td>

                    <td className="border p-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {
                          invoice.status
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {invoices.length ===
            0 && (
            <p className="text-center py-6 text-slate-500">
              No Invoices Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;