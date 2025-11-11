import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceCard from "../components/SpaceCard";

// Ícones de setor (Material)
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import ParkIcon from "@mui/icons-material/Park";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PoolIcon from "@mui/icons-material/Pool";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import StadiumIcon from "@mui/icons-material/Stadium";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { getReservasHojePorEspaco } from "../services/api";

interface Espaco { nome: string; reservas: number; }
interface Setor  { nome: string; espacos: Espaco[]; }

export default function DashboardView() {
  const navigate = useNavigate();

  const [setores,setSetores] = useState<Setor[]>([
    { nome: "Academia", espacos: [
      { nome: "Sala Multifuncional", reservas: 0 },
      { nome: "Spinning", reservas: 0 },
      { nome: "Avaliação Física", reservas: 0 },
      { nome: "Pilates", reservas: 0 },
      { nome: "Sala X101", reservas: 0 },
    ]},
    { nome: "Arena Beach", espacos: [
      { nome: "Arena Beach 1", reservas: 0 },
      { nome: "Arena Beach 2", reservas: 0 },
      { nome: "Arena Beach 3", reservas: 0 },
      { nome: "Arena Beach 4", reservas: 0 },
      { nome: "Arena Beach 5", reservas: 0 },
      { nome: "Arena Beach 6", reservas: 0 },
    ]},
    { nome: "Área Verde", espacos: [
      { nome: "Área Verde Campo Society", reservas: 0 },
      { nome: "Área Verde Estádio de Atletismo", reservas: 0 },
    ]},
    { nome: "Ginásio Poliesportivo", espacos: [
      { nome: "Quadra A", reservas: 0 },
      { nome: "Quadra B", reservas: 0 },
      { nome: "Quadra C", reservas: 0 },
      { nome: "Sala Multifuncional", reservas: 0 },
      { nome: "Sala GP1", reservas: 0 },
      { nome: "Sala GP2", reservas: 0 },
      { nome: "Sala GP4", reservas: 0 },
    ]},
    { nome: "Estádio de Atletismo", espacos: [
      { nome: "Pista", reservas: 0 },
      { nome: "Campo de Futebol", reservas: 0 },
      { nome: "Sala EA1", reservas: 0 },
    ]},
    { nome: "Campo Society", espacos: [
      { nome: "Campo Society", reservas: 0 },
      { nome: "Caramanchão", reservas: 0 },
    ]},
    { nome: "Piscina", espacos: [{ nome: "Piscina Olímpica", reservas: 0 }]},
    { nome: "Complexo de Tênis", espacos: [
      { nome: "Quadra de Tênis 1", reservas: 0 },
      { nome: "Quadra de Tênis 2", reservas: 0 },
      { nome: "Quadra de Tênis 3", reservas: 0 },
      { nome: "Quadra de Tênis 4", reservas: 0 },
    ]},
  ]);

  // Mapeia nome do setor -> ícone Material
  const iconForSetor = (nome: string) => {
    const commonProps = { fontSize: "small" as const, className: "text-[#0033A0]" };
    if (nome.includes("Academia")) return <FitnessCenterIcon {...commonProps} />;
    if (nome.includes("Arena Beach")) return <SportsVolleyballIcon {...commonProps} />;
    if (nome.includes("Área Verde")) return <ParkIcon {...commonProps} />;
    if (nome.includes("Ginásio")) return <StadiumIcon {...commonProps} />;
    if (nome.includes("Estádio")) return <DirectionsRunIcon {...commonProps} />;
    if (nome.includes("Campo Society")) return <SportsSoccerIcon {...commonProps} />;
    if (nome.includes("Piscina")) return <PoolIcon {...commonProps} />;
    if (nome.includes("Tênis")) return <SportsTennisIcon {...commonProps} />;
    return <ParkIcon {...commonProps} />;
  };
  
  useEffect(() => {
    async function carregarReservas() {
      try {
        const data = await getReservasHojePorEspaco(); // chama API
        const mapa = Object.fromEntries(
          data.map((item) => [item.espaco, item.count])
        );

        // Atualiza os setores aplicando as contagens corretas
        setSetores((prev) =>
          prev.map((setor) => ({
            ...setor,
            espacos: setor.espacos.map((espaco) => ({
              ...espaco,
              reservas: mapa[espaco.nome] || 0, // se não tiver, fica 0
            })),
          }))
        );
      } catch (erro) {
        console.error("Erro ao carregar reservas:", erro);
      }
    }

    carregarReservas();
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-[#0033A0]">Espaços Disponíveis</h2>
        <p className="text-gray-600">Selecione um espaço para ver a disponibilidade por dia e reservar.</p>
      </header>

      {setores.map((setor, i) => (
        <section key={i} className="mb-10">
          {/* Título de setor com ícone Material */}
          <div className="flex items-center gap-2 mb-3">
            {iconForSetor(setor.nome)}
            <h3 className="text-xl font-semibold text-gray-900">{setor.nome}</h3>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {setor.espacos.map((espaco, j) => (
              <SpaceCard
                key={j}
                name={espaco.nome}
                count={espaco.reservas}
                onClick={() => navigate(`/espaco/${encodeURIComponent(espaco.nome)}`)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
