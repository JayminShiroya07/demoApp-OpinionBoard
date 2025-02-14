import { use,useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);

  async function shareOpinionAction(prevFormSate,formData){
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Title must be at least five character');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be bewteen 10 and 300 charachters long.');
    }
    
    if(!userName.trim()){
      errors.push('please provide your name');
    }

    if (errors.length > 0) {
      return { errors, enteredValues : {
        title,
        body,
        userName
      }};
    }

    await addOpinion({title,body,userName})

    return { errors:null}
  }

  const [formSate, formAction] = useActionState(shareOpinionAction,{errors:null})

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formSate.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formSate.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formSate.enteredValues?.body}></textarea>
        </p>

        {formSate.errors &&
          <ul className="errors">
            {formSate.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
