package cn.haiyang.action.bankCardInfo;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.bankCardInfo.Bank;
import cn.haiyang.domain.bankCardInfo.BankCardInfo;
import cn.haiyang.domain.city.City;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.filter.GetHttpResponseHeader;
import cn.haiyang.service.bank.BankService;
import cn.haiyang.service.bankCardInfo.BankCardInfoService;
import cn.haiyang.service.city.CityService;
import cn.haiyang.service.user.IUserService;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.Response;
import cn.haiyang.utils.TokenUtil;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@Controller
@Scope("prototype")
@Namespace("/bankCardInfo")
public class BankCardInfoAction extends BaseAction implements ModelDriven<BankCardInfo>{

    private BankCardInfo bankCardInfo = new BankCardInfo();

    @Override
    public BankCardInfo getModel() {
        return bankCardInfo;
    }

    @Autowired
    private BaseCacheService baseCacheService;
    @Autowired
    private BankCardInfoService bankCardInfoService;

    @Autowired
    private BankService bankService;

    @Autowired
    private CityService cityService;

    @Autowired
    private IUserService iUserService;

    @Action("addBankCardInfo")
    public void addBankCardInfo(){
        String token =  GetHttpResponseHeader.getHeadersInfo(this.getRequest());

        int userId = (int)baseCacheService.getHmap(token).get("id");

        BankCardInfo bankCard = bankCardInfoService.findByUserId(userId);

        try {

            if(bankCard ==null){
                bankCardInfo.setUserId(userId);
                bankCardInfoService.addBankCardInfo(bankCardInfo);

                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).toJSON());
                return;

            }
            else{
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.CARDINFO_ALREADY_EXIST).toJSON());
                return;
            }


        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    //城市级联
    @Action("findCity")
    public void findCity(){
        this.getResponse().setCharacterEncoding("utf-8");
        String cityAreaNum = this.getRequest().getParameter("cityAreaNum");
         List<City> cs = cityService.findByParentCityAreaNum(cityAreaNum);
        try {
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(cs).toJSON());
            return;
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    //获取用户银行卡信息
    @Action("findBankInfoByUsername")
    public void findBankInfoByUsername(){

        this.getResponse().setContentType("text/html;charset:utf-8");
       String token =  GetHttpResponseHeader.getHeadersInfo(this.getRequest());
        Map<String,Object> hmap = baseCacheService.getHmap(token);
        try {
            if (hmap == null || hmap.size() == 0) {
                //用户未登录
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
                return;

            }
            String _username = TokenUtil.getTokenUserName(token);

            String username = this.getRequest().getParameter("username");

            Integer userId = null;


            if (_username.startsWith(username)) {
                userId = (Integer) baseCacheService.getHmap(token).get("id");
            }
            if(userId!=null){
                BankCardInfo bc = bankCardInfoService.findByUserId(userId);

                if(bc!=null){
                    this.getResponse().getWriter()
                            .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(bc).toJSON());
                    return;
                }
                else {
                    this.getResponse().getWriter()
                            .write(Response.build().setStatus(FrontStatusConstants.BREAK_DOWN).toJSON());
                    return;
                }
            }
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
            return;

        }catch (Exception e){
            e.printStackTrace();
        }


    }
    //查询所有银行
    @Action("findAllBanks")
    public void findAllBanks(){
        this.getResponse().setCharacterEncoding("utf-8");
        //this.getResponse().setContentType("text/html;charset:utf-8");
        String token =  GetHttpResponseHeader.getHeadersInfo(this.getRequest());

        List<Bank> banks = bankService.findAll();
        try {
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(banks).toJSON());
            return;
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    //获取省份列表
    @Action("findProvince")
    public void findProvince(){
        this.getResponse().setCharacterEncoding("utf-8");
        //this.getResponse().setContentType("text/html;charset:utf-8");
        List<City> cities = cityService.findProvince();
        try {
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(cities).toJSON());
            return;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Action("findUserInfo")
    public void findUserInfo(){
       // this.getResponse().setContentType("text/html;charset:utf-8");
        this.getResponse().setCharacterEncoding("utf-8");
        String token =  GetHttpResponseHeader.getHeadersInfo(this.getRequest());
        Map<String,Object> hmap = baseCacheService.getHmap(token);
        try {
            if (hmap == null || hmap.size() == 0) {
                //用户未登录
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
                return;

            }
            String _username = TokenUtil.getTokenUserName(token);

            String username = this.getRequest().getParameter("username");

            Integer userId = null;


            if (_username.startsWith(username)) {
                userId = (Integer) baseCacheService.getHmap(token).get("id");
            }
            if(userId!=null){
                UserModel us = iUserService.findById(userId);
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(us).toJSON());
                return;
            }
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
            return;

        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
