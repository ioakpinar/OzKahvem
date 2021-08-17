import "./ColorSection.css";

export default function ColorSection() {
  return (
    <div className="colorSection" id="colorSection">  {/* Menüdeki hakkımızda linkine tıklandığında bu linke gitmemizi sağlayan id. */}
      <div className="colorSection__body container">
        <div className="colorSection__left">
          <h2>Hakkımızda</h2>
          <p>
            İçinde yaşadığımız günlerde değişen şartlar neticesinde değişmeyen
            alışkanlıklarımızdan kahve kültürümüzün sizler için önemini
            özümsüyor ve bu kültürü yaşatma amacıyla yolumuza devam ediyoruz.
          </p>
        </div>
        <div className="colorSection__right">
          <img
            src="https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80"
            alt="coffee image"
          />
        </div>
      </div>
    </div>
  );
}
