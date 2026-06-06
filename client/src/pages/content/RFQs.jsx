import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createRFQ, getRFQs } from "../../services/rfqService";
import { getVendors } from "../../services/vendorService";

const RFQs = () => {
  const [vendors, setVendors] = useState([]);
  const [rfqs, setRfqs] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchVendors();
    fetchRFQs();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors);
    } catch (error) {
      toast.error("Failed to load vendors");
    }
  };

  const fetchRFQs = async () => {
    try {
      const res = await getRFQs();
      setRfqs(res.rfqs);
    } catch (error) {
      toast.error("Failed to load RFQs");
    }
  };

  const onSubmit = async (data) => {
    try {
      await createRFQ(data);

      toast.success("RFQ Created");

      reset();

      fetchRFQs();
    } catch (error) {
      toast.error("Failed to create RFQ");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        RFQ Management
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create RFQ
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="RFQ Title"
            {...register("title")}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Quantity"
            {...register("quantity")}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="date"
            {...register("deadline")}
            className="border rounded-lg px-4 py-2"
          />

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

          <textarea
            placeholder="Description"
            {...register("description")}
            className="border rounded-lg px-4 py-2 md:col-span-2"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg md:col-span-2"
          >
            Create RFQ
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          RFQ List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border">
                  Title
                </th>

                <th className="p-3 border">
                  Vendor
                </th>

                <th className="p-3 border">
                  Quantity
                </th>

                <th className="p-3 border">
                  Deadline
                </th>

                <th className="p-3 border">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {rfqs.map((rfq) => (
                <tr key={rfq._id}>
                  <td className="border p-3">
                    {rfq.title}
                  </td>

                  <td className="border p-3">
                    {rfq.vendorId?.companyName}
                  </td>

                  <td className="border p-3">
                    {rfq.quantity}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      rfq.deadline
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-3">
                    {rfq.status}
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

export default RFQs;