import "./App.css";
import { ImagenStyles } from "../Values/ImagenStyles";
import { randomImages, imagendefault } from "../Values/Images";
import { ImagenSizes } from "../Values/ImagenSizes";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import fileDownload from "js-file-download";

function App() {
  const [imgsGenerated, setImgsGenerated] = useLocalStorage(
    "imgs-generated",
    []
  );
  const [textGenerator, setTextGenerator] = useState("");
  const [style, setStyle] = useState(1);
  const [size, setSize] = useState(1);
  const [imgGenerated, setImgGenerated] = useState(imagendefault);

  const generarImagen = () => {
    if (textGenerator && style) {
      const img = randomImages[Math.floor(Math.random() * randomImages.length)];
      setImgGenerated(img);
      setImgsGenerated([img, ...imgsGenerated]);
      setTextGenerator("");
    }
  };

  const dowloadImage = async (url, filename) => {
    const image = await axios.get(url, {
      responseType: "blob",
    });
    fileDownload(image.data, filename);
  };

  return (
    <>
      <p className="arti-title uk-text-center ">Bienvenido a Arti-Dream</p>

      <div class="uk-navbar-container" data-uk-navbar data-uk-sticky>
        <div class="uk-navbar-center">
          <a href="/" class="uk-navbar-item uk-logo">
            <img src="/icon.webp" alt="logo" height="45px" width="45px" />
            <span className="navbar-logo-name">Arti-Dream</span>
          </a>
        </div>
      </div>

      <div className="uk-container uk-container-expand uk-padding">
        <div
          className="uk-child-width-1-2@m uk-grid-match uk-grid-small uk-grid container-generator"
          data-uk-grid
        >
          <div className="uk-padding">
            <p>
              Genera una imagen con el texto que ingreses y estilo que eligas
            </p>
            <input
              className="uk-input uk-margin-bottom"
              type="text"
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
                    <li key={item.alt} className="uk-active">
                      <div
                        data-uk-tooltip={item.name}
                        onClick={() => {
                          setStyle(item.id);
                        }}
                      >
                        <img
                          src={item.url}
                          width="100"
                          height="100"
                          alt={item.name}
                          style={{
                            borderRadius: "10px",
                          }}
                        />
                        {style === item.id && (
                          <div
                            className="uk-position-cover uk-overlay-default"
                            style={{ borderRadius: "9px" }}
                          >
                            <div className="uk-position-center uk-text-center">
                              <span>{item.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
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
                    <li key={item.alt} className="uk-active">
                      <div
                        data-uk-tooltip={item.name}
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
                          <div className="uk-position-cover uk-overlay-default ">
                            <div className="uk-position-center uk-text-center ">
                              <span>{item.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
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

          <div className="uk-flex-last@s uk-card-media-right ">
            {imgGenerated && (
              <>
                <div className="uk-padding uk-padding-remove-left">
                  <p>Imagen generada</p>
                  <img src={imgGenerated} className="uk-cover-container" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="uk-container uk-container-expand uk-padding">
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
                <div
                  className="uk-inline-clip uk-transition-toggle"
                  onClick={() => dowloadImage(item, "sample.jpg")}
                >
                  <img src={item} alt="" />
                  <div class="uk-position-center">
                    <span
                      class="uk-transition-fade"
                      uk-icon="icon: download; ratio: 4"
                    ></span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className="uk-button arti-button-clear"
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
