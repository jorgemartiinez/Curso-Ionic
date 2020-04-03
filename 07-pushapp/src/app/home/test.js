function GTranslateGetCurrentLang() {
  var keyValue = document["cookie"].match("(^|;) ?googtrans=([^;]*)(;|$)");
  return keyValue ? keyValue[2].split("/")[2] : null;
}
function GTranslateFireEvent(element, event) {
  try {
    if (document.createEventObject) {
      var evt = document.createEventObject();
      element.fireEvent("on" + event, evt);
    } else {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true);
      element.dispatchEvent(evt);
    }
  } catch (e) { }
}
function doGTranslate(lang_pair) {
  if (lang_pair.value) lang_pair = lang_pair.value;
  if (lang_pair == "") return;
  var lang = lang_pair.split("|")[1];
  if (GTranslateGetCurrentLang() == null && lang == lang_pair.split("|")[0])
    return;
  var teCombo;
  var sel = document.getElementsByTagName("select");
  for (var i = 0; i < sel.length; i++)
    if (/goog-te-combo/.test(sel[i].className)) {
      teCombo = sel[i];
      break;
    }
  if (
    document.getElementById("google_translate_element2") == null ||
    document.getElementById("google_translate_element2").innerHTML.length ==
    0 ||
    teCombo.length == 0 ||
    teCombo.innerHTML.length == 0
  ) {
    setTimeout(function () {
      doGTranslate(lang_pair);
    }, 500);
  } else {
    teCombo.value = lang;
    GTranslateFireEvent(teCombo, "change");
    GTranslateFireEvent(teCombo, "change");
  }

  /* DETECTAR IDIOMA */
  const URLIFRAME = "https://www.webparainmobiliarias.com.es/frame-clientes/2304/index.php";

  const CODSP = "idio=1";
  const CODENGLISH = "idio=2";
  const CODGERMAN = "idio=3";
  const CODFRENCH = "idio=4";
  const CODDUCTH = "idio=5";
  const CODNW = "idio=6";
  const CODRUSSIA = "idio=7";
  const CODPORT = "idio=8";
  const CODSW = "idio=9";
  const CODFIN = "idio=10";
  const CODCHINA = "idio=11";

  let serviciosIframe = document.getElementById("servicios-iframe");
  let els = document.querySelectorAll("a[href^='https://www.webparainmobiliarias.com']");

  if (serviciosIframe && window.location.href.indexOf("propiedades") != -1) {
    switch (lang_pair) {
      case "es|es":
        serviciosIframe.src = URLIFRAME + "?" + CODSP;
        break;
      case "es|en":
        serviciosIframe.src = URLIFRAME + "?" + CODENGLISH;
        break;
      case "es|fr":
        serviciosIframe.src = URLIFRAME + "?" + CODFRENCH;
        break;
      case "es|de":
        serviciosIframe.src = URLIFRAME + "?" + CODGERMAN;
        break;
      case "es|nl":
        serviciosIframe.src = URLIFRAME + "?" + CODDUCTH;
        break;
      case "es|no":
        serviciosIframe.src = URLIFRAME + "?" + CODNW;
        break;
      case "es|ru":
        serviciosIframe.src = URLIFRAME + "?" + CODRUSSIA;
        break;
      case "es|pt":
        serviciosIframe.src = URLIFRAME + "?" + CODPORT;
        break;
      case "es|sv":
        serviciosIframe.src = URLIFRAME + "?" + CODSW;
        break;
      case "es|fi":
        serviciosIframe.src = URLIFRAME + "?" + CODFIN;
        break;
      case "es|zh-CN":
      case "es|zh-TW":
        serviciosIframe.src = URLIFRAME + "?" + CODCHINA;
        break;
      default:
        serviciosIframe.src = URLIFRAME + "?" + CODENGLISH;
        break;
    }
  } else if (els && window.location.href.indexOf("propiedades") === -1) {
    let codCountry = "";
    switch (lang_pair) {
      case "es|es":
        codCountry = CODSP;
        break;
      case "es|en":
        codCountry = CODENGLISH;
        break;
      case "es|fr":
        codCountry = CODFRENCH;
        break;
      case "es|de":
        codCountry = CODGERMAN;
        break;
      case "es|nl":
        codCountry = CODDUCTH;
        break;
      case "es|no":
        codCountry = CODNW;
        break;
      case "es|ru":
        codCountry = CODRUSSIA;
        break;
      case "es|pt":
        codCountry = CODPORT;
        break;
      case "es|sv":
        codCountry = CODSW;
        break;
      case "es|fi":
        codCountry = CODFIN;
        break;
      case "es|zh-CN":
      case "es|zh-TW":
        codCountry = CODCHINA;
        break;
      default:
        codCountry = CODENGLISH;
        break;
    }

    for (let i = 0, l = els.length; i < l; i++) {
      let url = els[i];
      
        let existeIdioma = url.href.indexOf("&idio");
        
        if (existeIdioma > -1) {
          let nuevaURL = url.href.slice(0, url.href.lastIndexOf("&"))
                url.href = nuevaURL + "&" + codCountry;
            } else {
              
                let tieneParametros = url.href.indexOf("?");
              
                if(tieneParametros > -1) {
                  url.href = url.href + "&" + codCountry;
                }else{
                   url.href = url.href + "?" + codCountry;
                }
            }
  }
}