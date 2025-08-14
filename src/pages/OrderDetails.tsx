import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="m-auto  max-w-[1280px] px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>
      <div className="border shadow-sm rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead className="min-w-[150px]">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#3210</TableCell>
              <TableCell>Feb 20, 2022</TableCell>
              <TableCell className="">
                <Badge variant="default" className="bg-green-700">Delivered</Badge>
              </TableCell>
              <TableCell className="text-right">$42.25</TableCell>
              <TableCell className="text-right">
                    <Button variant="link">
                        View
                    </Button>
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </div>
    </div>
  )
}