package cn.haiyang.cache;

import java.util.List;
import java.util.Map;

public interface BaseCacheService {

	public void set(String key, String value);

	public String get(String key);

	public void append(String key, String value);

	public void del(String key);

	public void expire(String key, long seconds);

	/**
	 * 获取过期时间
	 */
	public Long ttl(String key);

	/**
	 * 右侧插入list，列表追加
	 * 
	 * @param key
	 * @param list
	 * @return
	 */
	public <T> long rPush(String key, List<T> list);

	/**
	 * 获取
	 * 
	 * @param key
	 * @param index
	 * @return
	 */
	public <T> T lindex(String key, long index);

	/**
	 * 获取list集合中的连续某几项
	 * 
	 * @return
	 */
	public <T> List<T> lRange(String key, long start, long end);

	/**
	 * 保留list区间
	 * 
	 * @param key
	 * @param start
	 * @param end
	 */
	public void lTrim(String key, long start, long end);

	/**
	 * 替换列表
	 * 
	 * @param key
	 * @param list
	 * @return
	 */
	public <T> void setList(String key, List<T> list);

	/**
	 * 设置map缓存
	 * 
	 * @param key
	 * @param map
	 */
	public void setHmap(String key, Map<String, Object> map);

	/**
	 * 获取map缓存
	 * 
	 * @param key
	 * @return
	 */
	public Map<String, Object> getHmap(String key);

	/**
	 * 取消token失效时间
	 * 
	 * @param key
	 * @return
	 */
	public void setPersist(String key);

	/**
	 * 判断是否失效
	 * 
	 * @param key
	 * @return
	 */
	public boolean isExist(String key);
}
