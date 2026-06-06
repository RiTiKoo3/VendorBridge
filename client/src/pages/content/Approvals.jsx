import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getQuotations } from "../../services/quotationService";
import {
  createApproval,
  getApprovals,
} from "../../services/approvalService";

const Approvals = () => {
  const [quotations, setQuotations] = useState([]);
  const [approvals, setApprovals] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchQuotations();
    fetchApprovals();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations();
      setQuotations(res.quotations);
    } catch (error) {
      toast.error("Failed to load quotations");
    }
  };

  const fetchApprovals = async () => {
    try {
      const res = await getApprovals();
      setApprovals(res.approvals);
    } catch (error) {
      toast.error("Failed to load approvals");
    }
  };

  const onSubmit = async (data) => {
    try {
      await createApproval(data);

      toast.success("Approval Created");

      reset();

      fetchApprovals();
    } catch (error) {
      toast.error("Failed to create approval");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Approval Management
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Approval
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            {...register("quotationId")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Quotation
            </option>

            {quotations.map((quotation) => (
              <option
                key={quotation._id}
                value={quotation._id}
              >
                {quotation.vendorId?.companyName} - ₹
                {quotation.price}
              </option>
            ))}
          </select>

          <select
            {...register("status")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>
          </select>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg md:col-span-2"
          >
            Create Approval
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Approval List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
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
              {approvals.map((approval) => (
                <tr key={approval._id}>
                  <td className="border p-3">
                    {
                      approval.quotationId?.rfqId
                        ?.title
                    }
                  </td>

                  <td className="border p-3">
                    {
                      approval.quotationId
                        ?.vendorId?.companyName
                    }
                  </td>

                  <td className="border p-3">
                    ₹
                    {
                      approval.quotationId
                        ?.price
                    }
                  </td>

                  <td className="border p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        approval.status ===
                        "approved"
                          ? "bg-green-100 text-green-700"
                          : approval.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {approval.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {approvals.length === 0 && (
            <p className="text-center py-6 text-slate-500">
              No approvals found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approvals;