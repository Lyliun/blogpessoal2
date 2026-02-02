import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="border border-slate-300 rounded-xl shadow-md flex flex-col justify-between">
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-slate-800">
          Tema
        </h3>
        <p className="text-slate-600 mt-2">
          {tema.descricao}
        </p>
      </div>

      <div className="flex">
        <Link
          to={`/editarTema/${tema.id}`}
          className="w-1/2 text-center py-2 bg-indigo-400 text-white hover:bg-indigo-700 rounded-bl-xl"
        >
          <button className="w-full h-full">Editar</button>
        </Link>

        <Link
          to={`/deletarTema/${tema.id}`}
          className="w-1/2 text-center py-2 bg-red-400 text-white hover:bg-red-700 rounded-br-xl"
        >
          <button className="w-full h-full">Deletar</button>
        </Link>

      </div>
    </div>
  )
}

export default CardTema
