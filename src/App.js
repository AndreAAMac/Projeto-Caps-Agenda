import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import { useEffect, useState } from 'react';

function App() {

  const produto = {
    codigo:'',
    nome:'',
    cidade:'Frutal',
    situação:'Primeira vez',
    dataConsulta:''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno=>retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  },[]);

  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value,});
  }

  //Cadastrar Produto
  const cadastrar = () =>{
    fetch("http://localhost:8080/cadastrar",{
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos,retorno_convertido]);
        //alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    }
    )
  }

  //Limpar formulário
  const limparFormulario = () =>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionar Produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  //Remover Produto
  const remover = () =>{
    fetch("http://localhost:8080/remover/"+objProduto.codigo,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      //Mensagem
      alert(retorno_convertido.mensagem);

      //Cópia de vetor de produtos
      let vetorTemp = [...produtos];

      //Indice
      let indice = vetorTemp.findIndex((p)=>{
        return p.codigo === objProduto.codigo;
      });

      //Remover produto do vetor temp 
      vetorTemp.splice(indice, 1);

      //Atualizar vetor de produtos
      setProdutos(vetorTemp);

      //Limpar formulario
      limparFormulario();

    })
  }

  //Alterar Produto
  const alterar = () =>{
    fetch("http://localhost:8080/alterar",{
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        //Mensagem
        alert('Produto alterado com sucesso!');

        //Cópia de vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo;
        });

        //Alterar produto do vetor temp 
        vetorTemp[indice] = objProduto;

        //Atualizar vetor de produtos
        setProdutos(vetorTemp);

        //Limpar formulario
        limparFormulario();
      }
    })
  }


  const [order, setOrder] = useState('name');

  const changeOrder = (order) => {
      if(order === 'name'){
        setOrder(order => order === 'name' ? 'name_desc' : 'name');
      } else if(order === 'date'){
        setOrder(order => order === 'date' ? 'date_desc' : 'date');
      } else if(order === 'city'){
        setOrder(order => order === 'city' ? 'city_desc' : 'city');
      }
    }

 

  return (
    <div className="App">
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto} order={order} ordenar={changeOrder}/>
      <div>
        <button onClick={() => changeOrder('name')}>Ordenar por nome</button>
        <button onClick={() => changeOrder('date')}>Ordenar por data</button>
        <button onClick={() => changeOrder('city')}>Ordenar por cidade</button>
      </div>
      </div>
  );
}

export default App;
