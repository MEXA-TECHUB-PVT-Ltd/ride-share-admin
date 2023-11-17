// ** Logo
import logo from "@src/assets/images/logo/logo.png";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <img className="fallback-logo" src={logo} alt="logo" style={{ width: 70 }} />
      <div className="">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
