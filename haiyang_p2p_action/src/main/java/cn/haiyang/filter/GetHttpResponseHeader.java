package cn.haiyang.filter;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.service.util.SpringContext;
import cn.haiyang.utils.ConfigurableConstants;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;




public class GetHttpResponseHeader {
	private static BaseCacheService baseCacheService = (BaseCacheService) SpringContext.getInstance().getBean("redisCache");
	private static RedisTemplate<String, Object> redisTemplate;

/**
 * @param request
 * @return
 */
	public static String getHeadersInfo(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		Enumeration headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			map.put(key, value);
		}
		String token=map.get("token"); //获取token
		
		if (!StringUtils.isEmpty(token)) { // 判断token是否为空,如果token不为空，取消失效时间，重新设置失效时间
			baseCacheService.setPersist(token);
			String tokenValid= ConfigurableConstants.getProperty("token.validity", "30");
			 baseCacheService.expire(token, Integer.parseInt(tokenValid)*60);//设置过期时间
		}
		return token;
	}

}