import "./App.css";
import { ImagenStyles } from "../Values/ImagenStyles";
import { randomImages } from "../Values/Images";
import { ImagenSizes } from "../Values/ImagenSizes";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [imgsGenerated, setImgsGenerated] = useLocalStorage(
    "imgs-generated",
    []
  );
  const [textGenerator, setTextGenerator] = useState("");
  const [style, setStyle] = useState(1);
  const [size, setSize] = useState(1);
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
      <p className="arti-title uk-text-center ">
        Bienvenido a Arti House Imagen Generator
      </p>
      <nav className="arti-navbar">
        <ul className="uk-navbar-nav">
          <li>
            {/*logo*/}
            <a href="/">
              <img src="/icon.webp" alt="logo" height="40px" width="40px" />
              Arti-Generator
            </a>
          </li>
        </ul>
      </nav>

      <div className="uk-container uk-container-expand uk-padding">
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin container-generator"
          data-uk-grid
        >
          <div className="uk-padding">
            <p>
              Genera una imagen con el texto que ingreses y estilo que eligas
            </p>
            <input
              className="uk-input uk-margin-bottom"
              type="text"
              value={textGenerator}
              onChange={(e) => setTextGenerator(e.target.value)}
            />

            <div>
              <p>Estilos</p>
              <ul
                className="uk-thumbnav uk-padding-small uk-padding-remove-left uk-padding-remove-top"
                data-uk-margin
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {/* image styles */}
                {ImagenStyles.map((item) => {
                  return (
                    <li key={item.alt} data-uk-tooltip={item.name}>
                      <a
                        onClick={() => {
                          setStyle(item.id);
                        }}
                      >
                        <img
                          src={item.url}
                          width="100"
                          height="67"
                          alt={item.name}
                          style={{
                            borderRadius: "8px",
                          }}
                        />
                        {style === item.id && (
                          <div class="uk-position-cover uk-overlay-default ">
                            <div class="uk-position-center uk-text-center ">
                              <span>{item.name}</span>
                            </div>
                          </div>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p>Tamaño</p>
              <ul
                className="uk-thumbnav uk-padding-small uk-padding-remove-left uk-padding-remove-top"
                data-uk-margin
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {ImagenSizes.map((item) => {
                  return (
                    <li key={item.alt} data-uk-tooltip={item.name}>
                      <a
                        onClick={() => {
                          setSize(item.id);
                        }}
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          width={item.with}
                          height={item.height}
                          style={{
                            backgroundSize: "cover",
                            with: item.with,
                            height: item.height,
                          }}
                        />
                        {size === item.id && (
                          <div class="uk-position-cover uk-overlay-default ">
                            <div class="uk-position-center uk-text-center ">
                              <span>{item.name}</span>
                            </div>
                          </div>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              className="uk-button uk-button-primary"
              onClick={() => generarImagen()}
            >
              Generar imagen
            </button>
          </div>

          <div className="uk-flex-last@s uk-card-media-right uk-cover-container">
            {imgGenerated && (
              <>
                <div className="uk-padding">
                  <p>Imagen generada</p>
                  <img src={imgGenerated} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="uk-container uk-container-xlarge uk-padding">
        <h2>Imagenes Generadas</h2>
        {/* images generated */}
        <ul
          className="uk-child-width-1-2 uk-child-width-1-5@m uk-text-center"
          data-uk-margin
          data-uk-grid="masonry: true"
        >
          {imgsGenerated.slice(0, 10).map((item, index) => {
            return (
              <li key={index}>
                <a>
                  <img src={item} alt="" />
                </a>
              </li>
            );
          })}
        </ul>{" "}
        <button
          className="uk-button uk-button-danger"
          onClick={() => {
            setImgsGenerated([]), setImgGenerated("");
          }}
        >
          Limpiar
        </button>
      </div>
    </>
  );
}

export default App;
