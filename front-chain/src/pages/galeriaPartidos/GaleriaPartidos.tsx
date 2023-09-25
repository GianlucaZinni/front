import React, { useState } from 'react';
import '../../commons/styles/GaleriaPartidos.css';

interface PartidoPolitico {
  id: number;
  nombre: string;
  imagenUrl: string;
}

interface GaleriaPartidosProps {
  partidos: PartidoPolitico[];
  onVotar: (partidoId: number) => void;
}

const GaleriaPartidos: React.FC<GaleriaPartidosProps> = ({ partidos, onVotar }) => {
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<number | null>(null);

  return (
    <div>
      <div className="galeria">
        {partidos.map(partido => (
          <div
            key={partido.id}
            className={`tarjeta ${partidoSeleccionado === partido.id ? 'seleccionado' : ''}`}
            onClick={() => setPartidoSeleccionado(partido.id)}
          >
            <img src={partido.imagenUrl} alt={partido.nombre} />
            <p>{partido.nombre}</p>
          </div>
        ))}
      </div>
      <button onClick={() => onVotar(partidoSeleccionado!)}>VOTAR</button>
    </div>
  );
};

export default GaleriaPartidos;
