export default function DisplayArea(Props) {
  let notes = Props.notes;

  return (

    <div className="flex flex-wrap justify-evenly bg-slate-700 w-full">

      {notes.map((item, i) => (
        <div
          key={i}
          className="w-fit max-w-[200px] h-fit p-4 rounded border bg-red text-white m-3"
        >
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      ))}
      
    </div>

  );
}
