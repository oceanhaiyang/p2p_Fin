package cn.haiyang.action.productRate;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.domain.product.ProductEarningRate;
import cn.haiyang.service.productRate.ProductService;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.Response;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Scope("prototype")
@Namespace("/productRate")
public class ProductRateAction extends BaseAction{
    @Autowired
    private ProductService productService;

    //根据产品ID获取产品的年收益率
    @Action("yearInterest")
    public void yearInterest(){
        String pid = this.getRequest().getParameter("pid");

        List<ProductEarningRate> pers = productService.findByProductId(Integer.parseInt(pid));

        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();

        for (ProductEarningRate per :pers){
            Map<String,Object> map = new HashMap<String,Object>();

            map.put("endMonth",per.getMonth());
            map.put("incomeRate",per.getIncomeRate());
            list.add(map);
        }

        try {
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(list).toJSON());

            return;
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
