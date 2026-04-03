import { useFinance } from "../../context/FinanceContext.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select.tsx";

import { Lock, LogIn } from "lucide-react";
const SelectRole = () => {
  const { userRole, setUserRole } = useFinance();
  return (
    <div className="w-full sm:w-auto">
      <Select
        value={userRole}
        onValueChange={(e) => setUserRole(e as "viewer" | "admin")}
      >
        <SelectTrigger className="w-full sm:w-auto">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="viewer">
            <div className="flex items-center gap-2">
              <LogIn className="w-3 h-3 sm:w-4 sm:h-4" /> Viewer
            </div>
          </SelectItem>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" /> Admin
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectRole;
