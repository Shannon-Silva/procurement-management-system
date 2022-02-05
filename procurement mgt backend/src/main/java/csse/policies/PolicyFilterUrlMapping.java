package csse.policies;

import csse.policies.filters.PreApprovedSupplierFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PolicyFilterUrlMapping {

    /**
     * @return a FilterRegistrationBean containing an instance of the filter
     * and the mapped URL patterns for the filter
     */
    @Bean
    public static FilterRegistrationBean<PreApprovedSupplierFilter> cssePolicyPreApprovedSuppliers() {

        FilterRegistrationBean<PreApprovedSupplierFilter> registrationBean
                = new FilterRegistrationBean<>();
        registrationBean.setFilter(new PreApprovedSupplierFilter());
        registrationBean.addUrlPatterns("/items");

        return registrationBean;
    }
}
