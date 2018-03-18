package cn.haiyang.utils.excelUtil;

import org.apache.log4j.Logger;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SimpleExcelUtil<T> {
		private Logger log = Logger.getLogger(this.getClass());
		public static DataFormatUtilInterface dataFormatUtilInterface = new DataFormatUtilInterfaceImpl();
		public static void setDataFormatUtilInterface(
				DataFormatUtilInterface dataFormatUtilInterface) {
			SimpleExcelUtil.dataFormatUtilInterface = dataFormatUtilInterface;
		}
		
		
		/**
		 * 方法描述：报表读取，默认读取报表的第一张表   （xbook.getSheetAt(0)）
		 * @param in 输入流
		 * @param titleCount 标题的行数
		 * @param callback 用户决定怎样封装实体的回调函数
		 * @return
		 * List<T>
		 */
		@Deprecated
		public List<T> getDataFromExcle(InputStream in,int titleCount,MatchupData<T> callback) {
			return getDataFromExcle(in,null,titleCount,callback);
		}
		
		/**
		 * 方法描述：报表读取，默认读取报表的第一张表   （xbook.getSheetAt(0)）
		 * @param in 输入流
		 * @param titleCount 标题的行数
		 * @param colunmCount 数据的列数
		 * @param callback 用户决定怎样封装实体的回调函数
		 * @return
		 * List<T> 你想要的集合
		 */
		public List<T> getDataFromExcle(InputStream in,int titleCount,int colunmCount,MatchupData<T> callback){
			return getDataFromExcle(in,null,titleCount,colunmCount,callback);
		}
		
		/**
		 * 方法描述：读取excel报表
		 * @param in 输入流
		 * @param callback 回调函数   用户自定义如何封装函数
		 * @param sheetName 报表名字（注意：  不是文件名字）
		 * @return  List<T> 返回实体对象集合
		 * 
		 */
		public List<T> getDataFromExcle(InputStream in, String sheetName, int titleCount, MatchupData<T> callback) {
			Workbook book = null;
			List<List<Object>> tempList = new ArrayList<List<Object>>();
			try {
				book = WorkbookFactory.create(in);
				if(book instanceof XSSFWorkbook){
					//.xlsx文件类型
					tempList  =	handleXssfBook((XSSFWorkbook)book,sheetName,titleCount,-1);
				}if(book instanceof HSSFWorkbook){
					//.xls文件类型
					tempList = handleHssfBook((HSSFWorkbook)book,sheetName,titleCount,-1);
				}
				
			} catch (EncryptedDocumentException e) {
				e.printStackTrace();
				throw new RuntimeException("加密失败：",e);
			} catch (InvalidFormatException e) {
				e.printStackTrace();
				throw new RuntimeException("无效的格式：",e);
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException("读取文件错误:", e);
			}
			//转换成对象集合返回
			return handleEntry(tempList,callback,titleCount);
			
		}
		
		/**
		 * 方法描述：读取excel报表
		 * @param in 输入流
		 * @param sheetName 报表名字
		 * @param titleCount 标题行数
		 * @param colunmCount 数据列数
		 * @param callback 
		 * @return
		 * List<T> 你想要的？
		 */
		public List<T> getDataFromExcle(InputStream in,String sheetName,int titleCount,int colunmCount,MatchupData<T> callback) {
			Workbook book = null;
			List<List<Object>> tempList = new ArrayList<List<Object>>();
			try {
				book = WorkbookFactory.create(in);
				if(book instanceof XSSFWorkbook){
					//.xlsx文件类型
					tempList  =	handleXssfBook((XSSFWorkbook)book,sheetName,titleCount,colunmCount);
				}if(book instanceof HSSFWorkbook){
					//.xls文件类型
					tempList = handleHssfBook((HSSFWorkbook)book,sheetName,titleCount,colunmCount);
				}
				
			} catch (EncryptedDocumentException e) {
				e.printStackTrace();
				throw new RuntimeException("加密失败：",e);
			} catch (InvalidFormatException e) {
				e.printStackTrace();
				throw new RuntimeException("无效的格式：",e);
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException("读取文件错误:", e);
			}
			return handleEntry(tempList,callback,titleCount);
			
		}
		
		/**
		 * 方法描述：将数据封装到实体集合
		 * @param tempList 封装的原始数据
		 * @param callback 回调接口
		 * @return
		 * List<T>
		 */
		@SuppressWarnings("unchecked")
		private List<T> handleEntry(List<List<Object>> tempList,MatchupData<T> callback,int title){
			if(log.isDebugEnabled()){
				log.debug("导入的数据集合："+tempList);
			}
			List<T> rlist = new ArrayList<T>();
			for(int i=0;i< tempList.size();i++){
				  try {
					  rlist.add((T) callback.macthData(tempList.get(i),i,dataFormatUtilInterface));
				} catch (Exception e) {
					String s = e.getMessage();
					if(s!=null&&s.indexOf("{")==-1){
						throw new ExcelDataFormatException("在第 "+(i+title+1)+" 行"+e.getMessage(),i+title+1, e);
					}
					String sub = s.substring(s.indexOf("{")+1,s.indexOf("}"));
					Integer column = null;
					if(!"null".equals(sub)){
							column = Integer.valueOf(sub);
							String address = ExcleAddress.getAddress(i+title, column);
							throw new ExcelDataFormatException("在excel中 "+address+"单元格发生错误，"+e.getMessage(),address, e);
					}
					throw new ExcelDataFormatException("在第"+(i+title+1)+" 行"+e.getMessage(),i+title+1, e);
				}
			}
			return rlist;
			
		}
		/**
		 * 方法描述：处理07及以上.xlsx版本
		 * @param xbook
		 * @param sheetName
		 * @param titleCount
		 * @return
		 * List<List<Object>>
		 */
		private List<List<Object>> handleXssfBook(XSSFWorkbook xbook,String sheetName,int titleCount,int colunmCount){
			//1 获得需要的数据表格 
			XSSFSheet xsheet =null;
			//当用户没有传入报表名字的时候
			if(null==sheetName||"".equals(sheetName)){
				xsheet=  xbook.getSheetAt(0);
			}else{
				xsheet = xbook.getSheet(sheetName);
			}
			// 
			List<List<Object>> result = new ArrayList<List<Object>>();
			int rowx = xsheet.getLastRowNum();
			for(int i=titleCount; i<=rowx;i++){
				//获得i行数据
				XSSFRow row = xsheet.getRow(i);
				//判断行是否为空
				if(null==row) continue;
				List<Object> rowlist = new ArrayList<Object>();
				//处理空行数据 标志
				boolean isempty = true;
				if(colunmCount==-1)colunmCount = row.getLastCellNum(); 
				for(int j=0;j<colunmCount;j++){
					XSSFCell cell = row.getCell(j);
					if(null==cell){
						rowlist.add(null);
						continue;
					}
					switch (cell.getCellType()) {
					case XSSFCell.CELL_TYPE_BLANK : //空白单元格
						rowlist.add(null);
						break;
					case XSSFCell.CELL_TYPE_BOOLEAN : //布尔值单元格   For blank cells we return a false
						rowlist.add(cell.getBooleanCellValue());
						isempty = false;
						break;
					case XSSFCell.CELL_TYPE_ERROR : //错误单元格 Returns the error message, such as #VALUE!
						rowlist.add(cell.getErrorCellString());
						isempty = false;
						break;
					case XSSFCell.CELL_TYPE_FORMULA : //用公式的单元格   取计算后的值
						int type = cell.getCachedFormulaResultType();
						rowlist.add(getValue(type,cell));
						isempty = false;
						break;
					case XSSFCell.CELL_TYPE_NUMERIC :  //数字单元格
						if(HSSFDateUtil.isCellDateFormatted(cell)){
							double d = cell.getNumericCellValue();
							Date date = HSSFDateUtil.getJavaDate(d);
							//结果以毫秒数返回
							rowlist.add(date);
						}else{
							BigDecimal big = new BigDecimal(String.valueOf(cell.getNumericCellValue()));
							rowlist.add(big.toString());
						}
						isempty = false;
						break;
					case XSSFCell.CELL_TYPE_STRING : //字符串单元格
						rowlist.add(cell.getStringCellValue());
						isempty = false;
						break;
					default:
						throw new ExcelDataFormatException("不支持转换的类型"+cell.getCellType());
					}
				}
				if(!isempty){
					result.add(rowlist);
				}
			}
			return result;
		}
		
		private Object getValue(int type,Cell cell){
			switch (type) {
			case Cell.CELL_TYPE_BLANK : //空白单元格
				return null;
			case Cell.CELL_TYPE_BOOLEAN : //布尔值单元格   For blank cells we return a false
				return cell.getBooleanCellValue();
			case Cell.CELL_TYPE_ERROR : //错误单元格 Returns the error message, such as #VALUE!
				return null;  //返回空串
			case Cell.CELL_TYPE_NUMERIC :  //数字单元格
				if(HSSFDateUtil.isCellDateFormatted(cell)){
					double d = cell.getNumericCellValue();
					Date date = HSSFDateUtil.getJavaDate(d);
					//结果以毫秒数返回
					return date;
				}else{
					BigDecimal big = new BigDecimal(String.valueOf(cell.getNumericCellValue()));
					return big.toString();
				}
			case Cell.CELL_TYPE_STRING : //字符串单元格
				return cell.getStringCellValue();
			default:
				throw new ExcelDataFormatException("不支持转换的类型："+cell.getCellType());
			}
		}

		/**
		 * 方法描述：处理2003版excel    .xls文件
		 * 如果传入的表格名不为空  按所给的文件名字读取表格数据    如果传入 null 或  ""
		 * 默认读取book的第一张表格（sheet1     index=0） hbook.getSheetAt(0)
		 * @param hbook  HSSFWorkbook.class
		 * @param colunmCount 列数
		 * @param sheetName 报表名称
		 * @return List<List<Object>>  返回处理后的表格数据的对象集合
		 */
		private List<List<Object>> handleHssfBook(HSSFWorkbook hbook, String sheetName, int titleCount, int colunmCount){
			HSSFSheet sheet = null;
			//当用户没有传入报表名字的时候  默认获得第一张表格数据
			if(null==sheetName||"".equals(sheetName)){
				sheet= hbook.getSheetAt(0);
			}else{
				sheet = hbook.getSheet(sheetName);
			}
			//result 储存所有的行
			List<List<Object>> result = new ArrayList<List<Object>>();
			
			int rows = sheet.getLastRowNum(); //获得最后一行
			for(int i=titleCount; i<=rows;i++){
				//获得一行数据sheet
				HSSFRow row = sheet.getRow(i);
				//判断行是否为空
				if(null==row) continue;
				// rowlist 用来装一行数据
				List<Object> rowlist = new ArrayList<Object>();
				//处理空行数据 标志
				boolean isempty = true;
				if(colunmCount==-1) colunmCount = row.getLastCellNum();
				for(int j = 0;j<colunmCount;j++){
					Cell cell = row.getCell(j);
					if(null==cell){
						rowlist.add(null);
						continue;
					}
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_BLANK : //空白单元格
						rowlist.add(null);
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN : //布尔值单元格   For blank cells we return a false
						rowlist.add(cell.getBooleanCellValue());
						isempty = false;
						break;
					case HSSFCell.CELL_TYPE_ERROR : //错误单元格 Returns the error message, such as #VALUE!
						rowlist.add(null);
						isempty = false;
						break;
					case HSSFCell.CELL_TYPE_FORMULA : //用公式的单元格   取计算后的值
						int type = cell.getCachedFormulaResultType();
						rowlist.add(getValue(type,cell));
						isempty = false;
						break;
					case HSSFCell.CELL_TYPE_NUMERIC :  //数字单元格
						if(HSSFDateUtil.isCellDateFormatted(cell)){
							double d = cell.getNumericCellValue();
							Date date = HSSFDateUtil.getJavaDate(d);
							//结果以毫秒数返回
							rowlist.add(date);
						}else{
							BigDecimal big = new BigDecimal(String.valueOf(cell.getNumericCellValue()));
							rowlist.add(big.toString());
						}
						isempty = false;
						break;
					case HSSFCell.CELL_TYPE_STRING : //字符串单元格
						rowlist.add(cell.getStringCellValue());
						isempty = false;
						break;
					default:
						throw new ExcelDataFormatException("不支持转换的类型："+cell.getCellType());
					}
				}
				if(!isempty){
					result.add(rowlist);
				}
					
				}
				
			return result;
		}
		
	}

