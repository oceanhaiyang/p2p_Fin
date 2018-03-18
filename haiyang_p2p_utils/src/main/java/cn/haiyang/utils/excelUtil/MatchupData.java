package cn.haiyang.utils.excelUtil;

import java.util.List;

/**
 * 类描述 ： 数据自定义接口
 * 创建日期：2015年5月22日
 * @param <T>
 */
public interface MatchupData<T> {
	/**
	 * 方法描述：将一行数据的集合封装到指定的实体  （list中数据的顺序与excel中列的顺序一致）
	 * @param data 需要数据转换的集合
	 * @param formatUtil 数据格式化工具
	 * @param indexOfRow 第几行
	 * @return
	 * T
	 */
	@SuppressWarnings("hiding")
	public <T>T macthData(List<Object> data, int indexOfRow, DataFormatUtilInterface formatUtil);
}
