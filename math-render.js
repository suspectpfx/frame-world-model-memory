const frameMath={
record:String.raw`r_j=(z_j,e_j,g_j,\ell_j,m_j,t_{\mathrm{capture},j},t_{\mathrm{write},j},\mathrm{provenance}_j)`,
distortion:String.raw`D_c(e,g,\ell,a,k,\Delta)=\mathbb{E}\!\left[L_c\!\left(f_c(\operatorname{Access}(r,a,k,A_{0:t},\Delta)),Y_c\right)\right]`,
decision:String.raw`\underset{\pi}{\operatorname{Pareto\!\!-minimize}}\;(B_{\mathrm{resident}},T_{\mathrm{service}},E)\quad\mathrm{s.t.}\quad D_c(\pi)\le\epsilon_c,\;\Pr[T_{\mathrm{action}}>d_c]\le\alpha_c`,
record_compact:String.raw`r_j=(z_j,e_j,g_j,\ell_j,m_j,\Delta_j)`,
contract:String.raw`\mathcal{C}_c=(L_c,\epsilon_c,g_c,\ell_c,d_c)`,
access:String.raw`x_{c,j}=\operatorname{Access}(r_j; a,k,A_{0:t})`,
inverse:String.raw`T_{\ell\rightarrow\ell_c}(Pz;m)=P^{-1}Pz=z\;\Longrightarrow\;L_c(f_c(z))\;\text{is recovered}`,
lossy:String.raw`\exists\;z_1\ne z_2:\;Qz_1=Qz_2\;\Longrightarrow\;\exists\;c\;\text{with unrecoverable task information}`,
lifecycle:String.raw`C_P(F)=w_P+F r_P,\qquad C_R(F)=w_R+F(r_R+c_m+c_{\mathrm{inv}})`
};
document.querySelectorAll('[data-frame-math]').forEach(e=>{const tex=frameMath[e.dataset.frameMath];if(tex&&window.katex)katex.render(tex,e,{displayMode:true,throwOnError:true,strict:'error',trust:false});});