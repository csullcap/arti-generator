import "./App.css";
import { ImagenStyles } from "../Values/ImagenStyles";
import { randomImages } from "../Values/Images";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [imgsGenerated, setImgsGenerated] = useLocalStorage(
    "imgs-generated",
    []
  );
  const [textGenerator, setTextGenerator] = useState("");
  const [style, setStyle] = useState("1");
  const [imgGenerated, setImgGenerated] = useState("");

  const generarImagen = () => {
    if (textGenerator && style) {
      const img = randomImages[Math.floor(Math.random() * randomImages.length)];
      setImgGenerated(img);
      setImgsGenerated([img, ...imgsGenerated]);
      setTextGenerator("");
    }
  };

  return (
    <>
      <div>Bienbenidoa Arti House Imagen Generator</div>
      <nav>
        <ul>
          <li>ARTI-GI</li>
        </ul>
      </nav>
      <h1>Generador de imagenes</h1>
      <p>Genera una imagen con el texto que ingreses y estilo que eligas </p>

      <input
        type="text"
        value={textGenerator}
        onChange={(e) => setTextGenerator(e.target.value)}
      />
      <div>
        <p>Estilos</p>
        {/* image styles */}
        {ImagenStyles.map((item) => {
          return (
            <div className="option-imagen-style" key={item.id}>
              <input
                type="radio"
                name="style"
                value={item.id}
                onChange={(e) => setStyle(e.target.value)}
                checked={style === item.id.toString()}
              />
              <img src={item.url} alt={item.alt} height="50px" width="50px" />
              <label htmlFor={item.id}>{item.name}</label>
            </div>
          );
        })}
      </div>

      <button onClick={() => generarImagen()}>Generar imagen</button>

      {imgGenerated && (
        <>
          <hr />
          <div>
            <p>Imagen generada</p>
            <img src={imgGenerated} height="100px" width="100px" />
          </div>
          <hr />
        </>
      )}

      <h2>Imagenes Generadas</h2>
      <div>
        <button onClick={() => setImgsGenerated([])}>Limpiar</button>
      </div>
      <div>
        {imgsGenerated.slice(0, 10).map((item, index) => {
          return (
            <div key={index}>
              <img src={item} height="100px" width="100px" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
