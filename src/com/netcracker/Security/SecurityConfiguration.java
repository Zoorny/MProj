package com.netcracker.Security;

import com.netcracker.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

	@Autowired
	CustomLogoutSuccessHandler customLogoutSuccessHandler;

	@Autowired
	DataSource dataSource;

	private static String REALM="REALM";
	
/*	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("ADMIN", "USER");
		auth.inMemoryAuthentication().withUser("tom").password("abc123").roles("USER");
	}*/

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("select LOGIN, PASSWORD, ENABLED from USERS where LOGIN=?")
				.authoritiesByUsernameQuery("select LOGIN, ROLE from USERS where LOGIN=?");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/recommendations.html").hasRole("USER")
                .antMatchers("/profile.html").hasRole("USER")
                .antMatchers("/admin.html").hasRole("ADMIN")
                //.and().httpBasic().realmName(REALM).authenticationEntryPoint(getBasicAuthEntryPoint())
                .and().formLogin()
                .permitAll().successHandler(customAuthenticationSuccessHandler)
                //.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().httpBasic()
				.and().logout().logoutSuccessHandler(customLogoutSuccessHandler);
 	}
	//.loginPage("/login.html") .failureUrl("/login-failure.html") .usernameParameter("username").passwordParameter("password")
/*	@Bean
	public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
		return new CustomBasicAuthenticationEntryPoint();
	}*/
	
/*    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }*/
}
