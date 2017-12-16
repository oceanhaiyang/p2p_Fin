package cn.haiyang.utils;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


/**
 * 
* @ClassName: TokenUtil
* @Description: 用户令牌工具类
*
 */
public class TokenUtil {
	
	/**
	 * 生成用户令牌
	 * @param userName
	 * @return
	 */
	public static String generateUserToken(String userName) {
		String token = Jwts.builder().setSubject(userName+System.nanoTime()).signWith(SignatureAlgorithm.HS256,Constant.BASE_64KEY).compact();
		return token;
	}
	
	/**
	 * 从令牌中取出用户名
	 * @param token
	 * @return
	 */
	public static String getTokenUserName(String token) {
		String userName=null;
		try{
			userName = Jwts.parser().setSigningKey(Constant.BASE_64KEY).parseClaimsJws(token).getBody().getSubject();
			return userName;
		}catch (Exception e){
			return userName;
		}
		
	}


}
