import "../Footer.css"

const Footer = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop:'150px'}}>
      <button role="button" className="button-name"><a href="https://github.com/marionpierret" target="_blank" style={{textDecorationLine: 'none', letterSpacing: '1px',color:"#3B4CCA"}}>marionperret</a></button>
      <button role="button" className="button-name"><a href="https://github.com/MeleElyes" target="_blank" style={{textDecorationLine: 'none', letterSpacing: '1px',color:"#3B4CCA"}}>MeleElyes</a></button>
      <button role="button" className="button-name"><a href="https://github.com/momoguiz" target="_blank" style={{textDecorationLine: 'none', letterSpacing: '1px',color:"#3B4CCA"}}>momoguiz</a></button>
      <button role="button" className="button-name"><a href="https://github.com/draosi" target="_blank" style={{textDecorationLine: 'none', letterSpacing: '1px',color:"#3B4CCA"}}>draosi</a></button>
    </div>
  );
};

export default Footer;
