const Web3 = require('web3')

window.onload = ()=>{
    
    //variables
    let web3
    let from

    //elements
    const connect = document.getElementById('connect')
    const content = document.getElementById('content')
    const mywallet = document.getElementById('mywallet')

    //formVariables
    const enviar = document.getElementById('enviar')
    const form = document.getElementById('send')
    const destino = document.getElementById('destino')
    const cantidad = document.getElementById('cantidad')


    //functions
    const conectar = async(e)=>{

        if(window.ethereum){
           try {
                await window.ethereum.request({method: 'eth_requestAccounts'}) 
                web3 = new Web3(window.ethereum)
                from = await web3.eth.getAccounts()
                //from = cuentas[0]
                content.style.display = 'initial'
                connect.style.display = 'none'
                mywallet.innerHTML = from[0]
               // e.preventDefault()
           } catch (error) {
               alert('has rechazado la coneccion')
           }
            
        } else{
            alert('conecta metamast')
        }     
    }
    const transaccion = (e)=>{
        const canti = cantidad.value 
        const desti = destino.value

        if(Number(canti) <= 0){
            alert('no envias nada codo') 
            return
            
        }
        if(!web3.utils.isAddress(desti)){
            alert('address no valida')
            return
        }
       
        try {
            web3.eth.sendTransaction({
                from: from[0],
                to: desti,
                value: canti,
            })  
        } catch (error) {
            alert('transaccion realizada')
        }
               
       e.preventDefault()
        
    }
    //listeners
    connect.onclick = conectar
    form.onsubmit = transaccion

}