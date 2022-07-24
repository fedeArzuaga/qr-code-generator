import { useRef, useState } from 'react'
import QRCode from 'qrcode'
import './style.css'
import trashUrl from './assets/trash.png'
import saveUrl from './assets/save.png'

function App() {

  const canvasContainer = useRef(null);

  const [urlState, setUrlState] = useState({
    value: "",
    dataUrl: "",
    isActive: false
  })

  const updateUrlInput = (e) => {
    setUrlState( state => ({
      ...state,
      value: e.target.value
    }))
  }

  const createQRCode = (e) => {
    e.preventDefault();
    if ( urlState.value.length > 0 ) {
      QRCode.toCanvas(canvasContainer.current, urlState.value, function( error ) {
        if ( error ) {
          console.log(error)
        }
        setUrlState( state => ({
          ...state,
          dataUrl: canvasContainer.current.toDataURL('image/png'),
          isActive: true
        }))
      })
    }
  }

  const resetForm = (e) => {
    setUrlState({
      value: "",
      dataUrl: "",
      isActive: false
    })
    let context = canvasContainer.current.getContext('2d');
    context.clearRect(0, 0, canvasContainer.current.width, canvasContainer.current.height); //clear html5 canvas
  }

  const saveQRCodeAsImage = (e) => {

  }

  return (
    <div className="App">
      <h1>Generador de códigos QR</h1>
      <div className="card">
        <p>
          Inserte el link de la URL que desee convertir <br/>a código QR en el siguiente campo
        </p>
      </div>
      <form onSubmit={ createQRCode } className="temp-form">
        <div className="temp-flex temp-flex-middle temp-flex-column temp-flex-row-m">
          {
            !urlState.isActive 
              ? (
                <>
                  <input 
                    className="temp-input" 
                    type="url" 
                    name="url" 
                    placeholder="Ej: https://www.jw.org/es/biblioteca/videos/..." 
                    value={ urlState.value }
                    onChange={ updateUrlInput }
                    required
                  />
                  <input className="temp-input temp-button" type="submit" value="Generar QR" />
                </>
              )
              : (
                <>
                  <button 
                    className="temp-button temp-button-red temp-w-100"
                    onClick={ resetForm }  
                  >
                    <img src={trashUrl} className="temp-icon" />
                    Borrar
                  </button>
                  <a 
                    className="temp-button temp-w-100 temp-m-t-10 temp-m-l-s-10"
                    onClick={ saveQRCodeAsImage } 
                    href={ urlState.dataUrl } 
                    download="qr-code.png"
                  >
                    <img src={saveUrl} className="temp-icon" />
                    Guardar QR
                  </a>
                </>
              )
          }
        </div>
      </form>
      <canvas id="qr-code-container" ref={ canvasContainer }></canvas>
    </div>
  )
}

export default App
