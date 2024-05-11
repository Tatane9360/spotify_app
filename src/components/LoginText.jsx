function LoginText() {
  return (
    <div className="w-10/12 max-w-md h-auto rounded-2xl bg-black text-white p-8">
      <h1 className="font-bold uppercase italic mb-4">
        Veuillez vous connecter a spotify pour profiter cette experience !
      </h1>
      <p className="text-start">
        <ul className="list-disc ml-4">
            <li className="mb-2">Apprenez en plus sur vos artistes preférés !</li>
            <li className="mb-2">Un quizz exceptionnel pour decouvrir des artistes</li>
            <li className="">Un lecteur musique qui permet de decouvrir de nouvelle musique et de les ajouter a vos favoris ! </li>  
        </ul>
      </p>
    </div>
  );
}

export default LoginText;
