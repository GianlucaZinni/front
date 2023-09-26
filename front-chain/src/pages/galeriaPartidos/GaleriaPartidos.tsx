import React, { useState } from 'react';
import '../../commons/styles/GaleriaPartidos.css';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

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
  const [modoGrilla, setModoGrilla] = useState<boolean>(false);

  return (
    <div>
      <div className="switcher">
        <div className="rail" onClick={() => setModoGrilla(!modoGrilla)}>
          <div className={`slider ${modoGrilla ? 'grilla' : 'lista'}`}>
            {modoGrilla ? <AppsIcon /> : <ListIcon />}
          </div>
        </div>  
      </div>


      <div className={`galeria ${modoGrilla ? 'grilla' : ''}`}>
        {partidos.map(partido => (
          <div
            key={partido.id}
            className={`tarjeta ${partidoSeleccionado === partido.id ? 'seleccionado' : ''}`}
            onClick={() => setPartidoSeleccionado(partido.id)}
          >
            <img className="voleta" src={partido.imagenUrl} alt={partido.nombre} />
            <h2>{partido.nombre}</h2>
          </div>
        ))}
      </div>
      <button 
      className='btn-send'
      onClick={() => onVotar(partidoSeleccionado!)}
      >VOTAR</button>
    </div>
  );
};

export default GaleriaPartidos;
