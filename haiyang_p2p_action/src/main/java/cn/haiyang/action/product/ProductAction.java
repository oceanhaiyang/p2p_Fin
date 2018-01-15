package cn.haiyang.action.product;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.domain.product.Product;
import cn.haiyang.domain.product.ProductEarningRate;
import cn.haiyang.service.product.IProductService;
import cn.haiyang.utils.JsonMapper;
import cn.haiyang.utils.Response;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
@Namespace("/product")
public class ProductAction extends BaseAction implements ModelDriven<Product> {
	//模型驱动
	private Product product = new Product();
	
	@Override
	public Product getModel() {
		// TODO Auto-generated method stub
		return product;
	}

	@Autowired
	private IProductService productService;
	
	@Autowired
	private RedisTemplate redisTemp;
	
	/**
	 * 产品利率的回显
	 */
	@Action("findRates")
	public void findRates(){
		String proId = this.getRequest().getParameter("proId");
		List<ProductEarningRate> pe = productService.findRatesById(Long.parseLong(proId));
		String a = JSON.toJSONString(pe);
		JSONArray b = JSON.parseArray(a);
		JSONObject object = new JSONObject();
		object.put("data",b);
		object.put("status","1");





		System.out.println(object);
		//
		
		try {
			//this.getResponse().getWriter().write(Response.build().setStatus("1").setData(pe).toJSON());
			this.getResponse().getWriter().print(object);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	/**
	 *   产品的修改
	 * 产品利率是json格式，需要单独封装为list<ProductEarningRate>,
	 * 再放入模型中一并更新。
	 */
	@Action("modifyProduct")
	public void modifyProduct(){
		String proEarningRates = this.getRequest().getParameter("proEarningRates");
		//接收的利率为json,转为list才能保存。
		Map map =new JsonMapper().fromJson(proEarningRates, Map.class);
		List<ProductEarningRate> pList = new ArrayList<ProductEarningRate>();
		for (Object key : map.keySet()) {
			ProductEarningRate per = new ProductEarningRate();
			per.setMonth(Integer.parseInt(key.toString()));
			per.setIncomeRate(Double.parseDouble(map.get(key).toString()));
			per.setId((int)product.getProId());
			pList.add(per);
		}
		product.setProEarningRate(pList);
		productService.update(product);
		
		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 查询某个产品信息
	 */
	@Action("findProductById")
	public void findById(){
		this.getResponse().setCharacterEncoding("utf-8");
		
		String proId = this.getRequest().getParameter("proId");
		
		Product p = productService.findOne(Long.parseLong(proId));
		
		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").setData(p).toJSON());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	/**
	 * 查询产品信息
	 */
	@Action("findAllProduct")
	public void findAll(){
		this.getResponse().setCharacterEncoding("utf-8");
		List<Product> list = productService.findAll();
		
		
		
		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").setData(list).toJSON());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
}
