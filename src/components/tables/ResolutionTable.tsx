import { Badge } from "../ui/Badge";

export interface Incident {
  id: string;
  title: string;
  service: string;
  priority: "P1" | "P2" | "P3";
  status: "OPEN" | "RESOLVED";
  opened: string;
}

interface ResolutionTableProps {
  incidents: Incident[];
}

const priorityClass: Record<string, string> = {
  P1: "p1",
  P2: "p2",
  P3: "p3",
};

export function ResolutionTable({ incidents }: ResolutionTableProps) {
  return (
    <div className="res-table-wrap">
      <table className="res-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Service</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Opened</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr key={inc.id}>
              <td className="res-id">{inc.id}</td>
              <td>{inc.title}</td>
              <td>{inc.service}</td>
              <td>
                <span className={`priority ${priorityClass[inc.priority]}`}>
                  {inc.priority}
                </span>
              </td>
              <td>
                <Badge variant={inc.status === "OPEN" ? "warning" : "healthy"}>
                  {inc.status}
                </Badge>
              </td>
              <td>{inc.opened}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
