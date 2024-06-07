import Navbar from "@components/Navbar";

const Test = () => {
  return (
    <div className="">
      <Navbar fixed={false} />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>This is a h1</h1>
        <h2>This is a h2</h2>
        <h3>This is a h3</h3>
        <button className="btn">Primary Button</button>
        <button className="btn-secondary">Secondary Button</button>
        <button className="btn-accent">Secondary Button</button>
        <div className="card">
          <h2>This is a card with random contents in it</h2>
          <button className="btn-invert">Inverted primary</button>
          <button className="btn-secondary-invert">Inverted secondary</button>
          <button className="btn-accent-invert">Inverted accent</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
