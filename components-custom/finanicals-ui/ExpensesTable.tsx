import React from "react";

const TableHeader = ({ headers }: { headers: string[] }) => (
  <thead className="bg-gray-100 text-gray-600">
    <tr>
      {headers.map((header, index) => (
        <th key={index} className="text-left px-4 py-2 border-b">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

interface RevenueRowProps {
  date: string;
  clientId: string;
  propertyId: string;
  type: string;
  purpose: string;
  balance: string;
}

const RevenueRow: React.FC<RevenueRowProps> = ({
  date,
  clientId,
  propertyId,
  type,
  purpose,
  balance,
}) => (
  <tr className="text-gray-700 border-b">
    <td className="px-4 py-2">{date}</td>
    <td className="px-4 py-2">{clientId}</td>
    <td className="px-4 py-2">{propertyId}</td>
    <td className="px-4 py-2">{type}</td>
    <td className="px-4 py-2">{purpose}</td>
    <td className="px-4 py-2">{balance}</td>
  </tr>
);

interface ExpenseRowProps {
  date: string;
  type: string;
  description: string;
  balance: string;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({
  date,
  type,
  description,
  balance,
}) => (
  <tr className="text-gray-700 border-b">
    <td className="px-4 py-2">{date}</td>
    <td className="px-4 py-2">{type}</td>
    <td className="px-4 py-2">{description}</td>
    <td className="px-4 py-2">{balance}</td>
  </tr>
);

const ExpensesTable = () => {
  const revenues: RevenueRowProps[] = [
    {
      date: "11/02/2024",
      clientId: "#232498",
      propertyId: "#2324312",
      type: "CR",
      purpose: "Rent",
      balance: "₦200,000",
    },
    {
      date: "11/02/2024",
      clientId: "#232498",
      propertyId: "#2324312",
      type: "CR",
      purpose: "Commission",
      balance: "₦200,000",
    },
    {
      date: "11/02/2024",
      clientId: "#232498",
      propertyId: "#2324312",
      type: "CR",
      purpose: "Commission",
      balance: "₦200,000",
    },
  ];

  const expenses: ExpenseRowProps[] = [
    {
      date: "11/02/2024",
      type: "Supplies",
      description: "WC Replacement",
      balance: "₦200,000",
    },
    {
      date: "11/02/2024",
      type: "Maintenance",
      description: "Light repairs",
      balance: "₦200,000",
    },
    {
      date: "11/02/2024",
      type: "Maintenance",
      description: "Security",
      balance: "₦200,000",
    },
  ];

  return (
    <div className="bg-white  p-6 w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-5">Net Revenue</h2>
        <table className="w-full text-sm text-left">
          <TableHeader headers={["Date", "Client ID", "Property ID", "Type", "Purpose", "Balance"]} />
          <tbody>
            {revenues.map((revenue, index) => (
              <RevenueRow key={index} {...revenue} />
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-5">Expenses</h2>
        <table className="w-full text-sm text-left">
          <TableHeader headers={["Date", "Type", "Description", "Balance"]} />
          <tbody>
            {expenses.map((expense, index) => (
              <ExpenseRow key={index} {...expense} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;
