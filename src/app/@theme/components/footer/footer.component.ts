import { Component } from '@angular/core';

@Component({
	selector: 'ngx-footer',
	styleUrls: ['./footer.component.scss'],
	template: `
	<div class="row f-right">
		<span class="">Powered by &nbsp;
			<a href="https://www.cibernos.com" target="_blank">
				<img src="assets/logo-cibernos.jpg" class="logotipoCibernos"/>
			</a>
		</span>
	</div>
  `,
})
export class FooterComponent {
}
