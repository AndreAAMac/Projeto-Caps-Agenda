function Tabela({vetor, selecionar, ordenar, order}){

    if(order === 'name'){
        vetor.sort((a, b) => a.nome.localeCompare(b.nome));
      } else if(order === 'date'){
        vetor.sort((a, b) => new Date(a.dataConsulta) - new Date(b.dataConsulta));
      } else if(order === 'city'){
        vetor.sort((a, b) => a.cidade.localeCompare(b.cidade));
      }
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cidade</th>
                    <th>Situacao</th>
                    <th>Data Consulta</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) =>(
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.cidade}</td>
                            <td>{obj.situação}</td>
                            <td>{obj.dataConsulta}</td>
                            <td><button onClick={()=>{selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
export default Tabela;