using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;

namespace TrempsDalProj
{
    public class TrempsDBService
    {
        //public static string serverName = System.Environment.MachineName;//gets the pc name
        //static string connectionString = $@"Server={System.Environment.MachineName}\SQLEXPRESS;Database=DBTremps;Trusted_Connection=True";//קוד לכניסה למדע נתונים       
        static string connectionString = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;//קוד לכניסה למדע נתונים


        //static string connectionString = $@"Data Source=LAPTOP-FMOR13KE;Initial Catalog=DBTremps;Integrated Security=True";

        static SqlConnection connection = new SqlConnection(connectionString);

        public static List<Tremp> GetAllTremps()
        {
            DataSet ds = new DataSet();
            SqlDataAdapter adapter = new SqlDataAdapter(
                " SELECT * " +
                " FROM tremps ", connection);
            adapter.Fill(ds, "T1");
            DataTable tremps = ds.Tables["T1"];
            List<Tremp> TrempList = new List<Tremp>();

            foreach (DataRow trempRow in tremps.Rows)
            {
                TrempList.Add(new Tremp()
                {
                    Id = (int)trempRow["Id"],
                    Type = (bool)trempRow["Type"],
                    Time = (DateTime)trempRow["Time"],
                    From_Root = (string)trempRow["From_Root"],
                    To_Root = (string)trempRow["To_Root"],
                });
            }
            return TrempList;
        }


        private static Tremp[] GetTrempByQuery(string query)
        {
            SqlCommand cmd = new SqlCommand(query, connection);
            List<Tremp> tremps = new List<Tremp>();

            try
            {
                cmd.Connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    tremps.Add(new Tremp()
                    {
                        Id = (int)reader["Id"],
                        Type = (bool)reader["Type"],
                        Time = (DateTime)reader["Time"],
                        From_Root = (string)reader["From_Root"],
                        To_Root = (string)reader["To_Root"],
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                cmd.Connection.Close();

            }

            return tremps.ToArray();
        }


        public static Tremp GetTrempById(int id)
        {
            return GetTrempByQuery(
                " SELECT * " +
                " FROM tremps " +
                " WHERE Id=" + id)[0];
        }


        private static void ExecNoneQuery(string noneQuery)
        {
            SqlCommand comm = new SqlCommand(noneQuery, connection);
            try
            {
                connection.Open();
                comm.ExecuteNonQuery();
            }
            catch (Exception)
            {

            }
            finally
            {
                connection.Close();
            }
        }

        public static string AddTremp(bool isType, DateTime trempTime, string fromRoot, string toRoot)
        {
            string sql = "INSERT INTO tremps" + "( Type, Time, From_Root, To_Root) VALUES " + "( @Type, @Time, @From_Root, @To_Root);";
            SqlCommand cmd = new SqlCommand(sql, connection);
            try
            {
                cmd.Connection.Open();
                cmd.Parameters.AddWithValue("@Type", isType ? 1 : 0);
                cmd.Parameters.AddWithValue("@Time", trempTime);
                cmd.Parameters.AddWithValue("@From_Root", fromRoot);
                cmd.Parameters.AddWithValue("@To_Root", toRoot);
                cmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
            finally
            {
                cmd.Connection.Close();
            }
            return "done";
        }


        public static void DeleteTremp(int id)
        {
            ExecNoneQuery("DELETE tremps WHERE Id=" + id);
        }



        public static void UpdateTremp(int id, string fromRoot, string toRoot)
        {
            string command = $" UPDATE tremps " +
                             $" Set From_Root='{fromRoot}', To_Root='{toRoot}'" +
                $" WHERE Id={id}";
            ExecNoneQuery(command);
        }
    }
}
