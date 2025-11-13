import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import Horarios from "../components/Horarios";
import NovaReservaView from "./NovaReservaView";

export default function DetalheEspacoView() {
  const { nome } = useParams<{ nome: string }>();
  const navigate = useNavigate();

  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [ReservaView, setReservaView] = useState(false);

  return(
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <button 
        onClick={() => navigate(-1)}
        className="text-[#0033A0] hover:underline mb-4"
        >← Voltar</button>

        <h2 className="text-2xl font-bold mb-6 text-[#0033A0]">{nome}</h2>

        <div style={{display:'flex',justifyContent:'center'}}>
        <CalendarComponent onSelectDay={setDiaSelecionado}></CalendarComponent>
        </div>

        {diaSelecionado && (
            <Horarios
            dia = {diaSelecionado}
            espaco={nome ?? ""}
            horaSelecionada={horaSelecionada}
            onSelectHour={(hora)=>{
                setHoraSelecionada(hora)
                setReservaView(true)
            }}
            />
        )}

        {ReservaView && horaSelecionada && (
          <NovaReservaView
            espaco={nome ?? ""}
          dia={diaSelecionado!}
          hora={horaSelecionada!}
        />
      )}
    </div>
  );
}
