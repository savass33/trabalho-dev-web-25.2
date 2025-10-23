import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface SpaceCardProps {
  name: string;
  count: number;
  onClick: () => void;
}

export default function SpaceCard({ name, count, onClick }: SpaceCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
      role="group"
    >
      {/* Nome do espaço + ícone */}
      <div className="flex items-center gap-2">
        <PlaceIcon fontSize="small" className="text-[#0033A0]" />
        <h4 className="font-semibold text-lg text-gray-900">{name}</h4>
      </div>

      {/* Reservas hoje + ícone */}
      <p className="text-gray-600 mt-2 flex items-center gap-1">
        <CalendarMonthIcon fontSize="small" className="text-gray-500" />
        Reservas hoje: {count}
      </p>

      {/* Botão com ícone */}
      <button
        onClick={onClick}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0033A0] text-white py-2.5 font-medium hover:bg-[#1E4BD1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0033A0]"
      >
        <ScheduleIcon fontSize="small" />
        Ver horários
      </button>
    </div>
  );
}
