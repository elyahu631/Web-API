using System.Linq;
using TrempsDalProj;

namespace TrempsBLLProj
{

    public enum TrempType { RIDE, TREMP,ALL }
    static public class TrempsBLL
    {
        static public Tremp[] GetAllTrempsFromDB(TrempType trempType)
        {
            Tremp[] tremps = null;
            if (trempType == TrempType.RIDE)
            {
                tremps = TrempsDBService.GetAllTremps().Where(tremp => tremp.Type == true).ToArray();
            }
            else if(trempType == TrempType.TREMP)
            {
                tremps = TrempsDBService.GetAllTremps().Where(tremp => tremp.Type == false).ToArray();
            }
            else
            {
                tremps = TrempsDBService.GetAllTremps().ToArray();
            }
            return tremps;
        }


        static public Tremp GetTrempById(int id)
        {
            Tremp tremp = TrempsDBService.GetTrempById(id);
            return tremp;
        }




        static public string AddTrempToDB(Tremp tremp)
        {
            return TrempsDBService.AddTremp(tremp.Type, tremp.Time, tremp.From_Root, tremp.To_Root);
        }


        static public string UpdateTrempFromDB(int id, Tremp tremp)
        {
            Tremp t = TrempsDBService.GetTrempById(id);
            TrempsDBService.UpdateTremp(id, tremp.From_Root, tremp.To_Root);
            return "Done";
        }


        static public string DeleteTrempFromDB(int id)
        {
            Tremp tremp = TrempsDBService.GetTrempById(id);
            TrempsDBService.DeleteTremp(id);
            return "Done";
        }
    }
}
