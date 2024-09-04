import { Label } from "@/components/ui/label";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { BookOpenCheck } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tabs as TAB,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";

const invoices = [
  {
    invoice: "Hoisting",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Currying",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Memoization",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Debouncing",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Throttling",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Parallelism",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Concurrency",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const advance = [
  {
    invoice: "Hoisting 2",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Currying 2",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Memoization 2",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Debouncing",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Throttling",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Parallelism",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Concurrency",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function PrepareSection() {
    const [level, setLevel] = React.useState("Beginner");
  return (
    <>
      <div
        className="relative rounded-lg outline-0 border-1 border-gray-900 bg-gray-100 dark:bg-gray-800 w-full"
        style={{ textTransform: "none", outline: "none" }}
      >
        <Input
          type="text"
          placeholder="Search topic"
          style={{ textTransform: "none", outline: "none" }}
          className="rounded-lg appearance-none text-md w-full outline-0 pl-10"
        />
        <SearchIcon className="absolute left-2.5 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-600" />
      </div>
      <TAB defaultValue="Beginner" value={level} className="w-[400px] mt-8">
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <TabsTrigger
            value="Beginner"
            onClick={() => setLevel("Beginner")}
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Beginner Topics
          </TabsTrigger>
          <TabsTrigger
            value="Advance"
            onClick={() => setLevel("Advance")}
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Advance Topics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Beginner" className="mt-4">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium text-[16px] p-[2px]">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="w-5/6 mb-1 bg-white text-black border-2">
                      <GraduationCap className="mr-2" />
                      Learn
                    </Button>
                    <Button className="w-5/6 bg-white text-black border-2">
                      <BookOpenCheck className="mr-2" />
                      Practice
                    </Button>
                  </TableCell>
                  <TableCell className="text-left">
                    <Checkbox key={invoice.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Advance" className="mt-4">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advance.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium text-[16px] p-[2px]">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="w-5/6 mb-1 bg-white text-black border-2">
                      <GraduationCap className="mr-2" />
                      Learn
                    </Button>
                    <Button className="w-5/6 bg-white text-black border-2">
                      <BookOpenCheck className="mr-2" />
                      Practice
                    </Button>
                  </TableCell>
                  <TableCell className="text-left">
                    <Checkbox key={invoice.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </TAB>
    </>
  );
}
