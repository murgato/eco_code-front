const FilterHome = () => <>
    <div className="row">
        <input type="text" placeholder="Buscar por número de ocorrencia ou assunto"/>
        <select name="status" id="" placeholder="Selecione">
            <option value="1">Todos</option>
        </select>
    </div>
    <div className="row">
        <div className="date-container">
            <input type="date"/>
            <input type="date"/>
        </div>
        <div className="btn-container">
            <button>Buscar</button>
            <button>Exportar</button>
        </div>
    </div>
</>

export {FilterHome}
