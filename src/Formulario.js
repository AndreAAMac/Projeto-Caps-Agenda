function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar})  {
  return (
    <form>
        <input type="text" value={obj.nome} name='nome' onChange={eventoTeclado} placeholder='Nome' className='form-control'  />

        <select value={obj.cidade} name='cidade' placeholder='Cidade' onChange={eventoTeclado} className='form-control' >
            <option value="Frutal">Frutal</option>
            <option value="Itapagipe">Itapagipe</option>
            <option value="Planura">Planura</option>
            <option value="Pirajuba">Pirajuba</option>
            <option value="Fronteira">Fronteira</option>
            <option value="Comendador Gomes">Comendador Gomes</option>
        </select>
        
        <select value={obj.situação} name="situação" onChange={eventoTeclado} placeholder='Situação' className='form-control' >
            <option value="Primeira vez">Primeira vez</option>
            <option value="Retorno">Retorno</option>
            <option value="Renovação de Receita">Renovação de Receita</option>
        </select>
        
        <input value={obj.dataConsulta} onChange={eventoTeclado} name='dataConsulta'  placeholder='Data da Consulta' className='form-control' type="date"  />

        {
            botao
            ?
            <input type="button" value='Cadastrar' className='btn btn-primary' onClick={cadastrar}/>
            :
            <div>
                <input type="button" value='Alterar' onClick={alterar} className='btn btn-warning'/>
                <input type="button" value='Remover' onClick={remover} className='btn btn-danger'/>
                <input type="button" value='Cancelar' onClick={cancelar} className='btn btn-secondary'/>    
            </div>
        }
    </form>
  )
}

export default Formulario;