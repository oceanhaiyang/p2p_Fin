package cn.haiyang.utils.excelUtil;

import java.util.Date;

/**
 * 类描述：格式化数据工具接口
 * 创建日期：2015年5月25日
 */
public interface DataFormatUtilInterface {
	/**
	 * 方法描述：将 BigDecimal 、String 类型转换成double 
	 * @param value 
	 * 		传入double，直接返回;传入float 类型提升； 
	 * 		传入BigDecimal：返回 doubleValue；
	 * 		传入String 返回parseDouble
	 * 		传入 byte int shot long 数据类型提升或转换 ；
	 * 		传入不可转换类 抛出异常
	 * @return double
	 */
	public double formatToDouble(Object value);
	/**
	 * 方法描述：将可转换为数值的数据转换成int类型
	 * 作者：liaoyu
	 * @param value
	 * 		传入null 返回0
	 * 		传入double,float,Long,先转换成BigDecimal，取intvalue 若超过Int 长度范围  会数据丢失；
	 * 		传入BigDecimal：返回 intValue；
	 * 		传入String 返回parseInt
	 * 		传入 byte shot int 数据类型提升或直接返回；  
	 * 		传入不可转换类 抛出异常
	 * @return
	 * int
	 */
	public int formatToInt(Object value);
	/**
	 * 方法描述：将可转换为数值的数据转换成int类型
	 * @param value
	 * 		传入null 返回0
	 * 		传入Long 返回long；
	 * 		传入double,float先转换成BigDecimal，取longvalue会数据丢失；
	 * 		传入BigDecimal：返回 longValue；
	 * 		传入String 返回parseLong
	 * 		传入 byte shot int 数据类型提升或直接返回；  
	 * 		传入不可转换类 抛出异常
	 * @return
	 * 		long
	 */
	public long formatToLong(Object value);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 日期的毫秒数 
	 * 		传入null 返回0
	 * 		传入timestemp时间类型为String类型时，需要传入时间的毫秒数  返回 new Date(Long.valueOf(timestemp))
	 * 		传入timestemp时间类型为Long类型时 返回 new Date(long timestemp)
	 * 		传入timestemp为Date （Java.util.date）直接返回
	 * 		传入timestemp为Java.sql.date时 返回 new Date(sql.date.Date.getTime())
	 * 		传入timestemp为其他任何形式，或对象，将抛出异常
	 * @return Date   (Java.util.date)
	 */
	public Date format(Object timestemp);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 时间戳
	 * @param patten 时间格式 （如：yyyy-MM-dd）
	 * @return String 返回 如（2010-10-10）
	 */
	public String formatToDateString(String timestemp, String patten);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 时间戳
	 * @param patten 时间格式 （如：yyyy-MM-dd）
	 * @return String 返回 如（2010-10-10）
	 */
	public String formatToDateString(Long timestemp, String patten);

	/**
	 * 方法描述：将 BigDecimal 、String 类型转换成double
	 * @param value
	 * 		传入double，直接返回;传入float 类型提升；
	 * 		传入BigDecimal：返回 doubleValue；
	 * 		传入String 返回parseDouble
	 * 		传入 byte int shot long 数据类型提升或转换 ；
	 * 		传入不可转换类 抛出异常
	 * @return double
	 */
	public double formatToDouble(Object value, Integer column);
	/**
	 * 方法描述：将可转换为数值的数据转换成int类型
	 * @param value
	 * @param column 当前列  从0开始（当某个单元格发生转换错误的时候  需要准确定位，则需要此参数）
	 * 传入null 返回0
	 * 		传入double,float,Long,先转换成BigDecimal，取intvalue 若超过Int 长度范围  会数据丢失；
	 * 		传入BigDecimal：返回 intValue；
	 * 		传入String 返回parseInt
	 * 		传入 byte shot int 数据类型提升或直接返回；
	 * 		传入不可转换类 抛出异常
	 * @return
	 * int
	 */
	public int formatToInt(Object value, Integer column);
	/**
	 * 方法描述：将可转换为数值的数据转换成int类型
	 * @param value
	 * @param column 当前列  从0开始（当某个单元格发生转换错误的时候  需要准确定位，则需要此参数）
	 * 传入null 返回0
	 * 		传入Long 返回long；
	 * 		传入double,float先转换成BigDecimal，取longvalue会数据丢失；
	 * 		传入BigDecimal：返回 longValue；
	 * 		传入String 返回parseLong
	 * 		传入 byte shot int 数据类型提升或直接返回；
	 * 		传入不可转换类 抛出异常
	 * @return
	 * 		long
	 */
	public long formatToLong(Object value, Integer column);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 日期的毫秒数
	 * @param column 当前列  从0开始（当某个单元格发生转换错误的时候  需要准确定位，则需要此参数）
	 * 传入null 返回0
	 * 		传入timestemp时间类型为String类型时，需要传入时间的毫秒数  返回 new Date(Long.valueOf(timestemp))
	 * 		传入timestemp时间类型为Long类型时 返回 new Date(long timestemp)
	 * 		传入timestemp为Date （Java.util.date）直接返回
	 * 		传入timestemp为Java.sql.date时 返回 new Date(sql.date.Date.getTime())
	 * 		传入timestemp为其他任何形式，或对象，将抛出异常
	 * @return Date   (Java.util.date)
	 */
	public Date format(Object timestemp, Integer column);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 时间戳
	 * @param patten 时间格式 （yyyy-MM-dd）
	 * @param column 当前列  从0开始（当某个单元格发生转换错误的时候  需要准确定位，则需要此参数）
	 * @return String 返回 给定格式的日期串（如 2015-10-10）
	 */
	public String formatToDateString(String timestemp, String patten, Integer column);
	/**
	 * 方法描述：将毫秒字符串转换成日期   无时区转换形式
	 * @param timestemp 时间戳
	 * @param patten 时间格式 （yyyy-MM-dd）
	 * @param column 当前列  从0开始   （当某个单元格发生转换错误的时候  需要准确定位，则需要此参数）
	 * @return String 返回 给定格式的日期串（如 2015-10-10）
	 */
	public String formatToDateString(Long timestemp, String patten, Integer column);
	
}
