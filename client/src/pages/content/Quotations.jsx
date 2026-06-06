import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getRFQs } from "../../services/rfqService";
import { getVendors } from "../../services/vendorService";
import {
  createQuotation,
  getQuotations,
} from "../../services/quotationService";

const Quotations = () => {
  const [rfqs, setRfqs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [quotations, setQuotations] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchRFQs();
    fetchVendors();
    fetchQuotations();
  }, []);

  const fetchRFQs = async () => {
    try {
      const res = await getRFQs();
      setRfqs(res.rfqs);
    } catch (error) {
      toast.error("Failed to load RFQs");
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors);
    } catch (error) {
      toast.error("Failed to load Vendors");
    }
  };

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations();
      setQuotations(res.quotations);
    } catch (error) {
      toast.error("Failed to load Quotations");
    }
  };

  const onSubmit = async (data) => {
    try {
      await createQuotation(data);

      toast.success("Quotation Submitted");

      reset();

      fetchQuotations();
    } catch (error) {
      toast.error("Failed to create quotation");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Quotation Management
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Submit Quotation
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* RFQ */}

          <select
            {...register("rfqId")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select RFQ
            </option>

            {rfqs.map((rfq) => (
              <option
                key={rfq._id}
                value={rfq._id}
              >
                {rfq.title}
              </option>
            ))}
          </select>

          {/* Vendor */}

          <select
            {...register("vendorId")}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Vendor
            </option>

            {vendors.map((vendor) => (
              <option
                key={vendor._id}
                value={vendor._id}
              >
                {vendor.companyName}
              </option>
            ))}
          </select>

          {/* Price */}

          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            className="border rounded-lg px-4 py-2"
          />

          {/* Delivery Days */}

          <input
            type="number"
            placeholder="Delivery Days"
            {...register("deliveryDays")}
            className="border rounded-lg px-4 py-2"
          />

          {/* Notes */}

          <textarea
            placeholder="Notes"
            {...register("notes")}
            className="border rounded-lg px-4 py-2 md:col-span-2"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg md:col-span-2"
          >
            Submit Quotation
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Quotations List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border">
                  RFQ
                </th>

                <th className="p-3 border">
                  Vendor
                </th>

                <th className="p-3 border">
                  Price
                </th>

                <th className="p-3 border">
                  Delivery Days
                </th>

                <th className="p-3 border">
                  Notes
                </th>
              </tr>
            </thead>

            <tbody>
              {quotations.map((quotation) => (
                <tr key={quotation._id}>
                  <td className="border p-3">
                    {quotation.rfqId?.title}
                  </td>

                  <td className="border p-3">
                    {quotation.vendorId?.companyName}
                  </td>

                  <td className="border p-3">
                    ₹ {quotation.price}
                  </td>

                  <td className="border p-3">
                    {quotation.deliveryDays} Days
                  </td>

                  <td className="border p-3">
                    {quotation.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quotations;