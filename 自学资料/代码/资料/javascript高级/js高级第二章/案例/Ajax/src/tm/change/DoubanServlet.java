package tm.change;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DoubanServlet
 */
public class DoubanServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DoubanServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String json = "{\"code\":1,\"list\":[{\"genres\": [\"爱情\"],\"title\": \"天亮之前\",\"name\":\"郭富城\"},{\"genres\": [\"爱情,赌片\"],\"title\": \"赌神\",\"name\":\"周润发\"}]}";
		String page =request.getParameter("page");
		if(page!=null){
			response.getWriter().write(json);
		}
		else{
			response.getWriter().write("{\"code\":2,\"msg\":\"没有数据！\"}");
		}
		System.out.println("fdsafdsa");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}
