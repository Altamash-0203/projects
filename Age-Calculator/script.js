
let y1=document.getElementById('year').value;
let agecal=document.getElementById('button').value


function age()
{
    let y1=document.getElementById('year').value;
    let date=new Date ()
    let y2=date.getFullYear()


    
    if(!y1)
        {
            alert("Please enter your birth year")
            return;
        }

        else if(y2<y1)
            {
                confirm(" !!! AGE DIDN'T FIND !!! ENTER VALID YEAR !!!")

            }
  let current_age=y2-y1
  
           
      
  document.querySelector('.result').innerHTML = `You are ${current_age} years old.`;
  


}