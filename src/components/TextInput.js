import { h } from 'hyperapp';

export default ({ value, onChange, placeholder, type='text' }) => <div class='Input'>
	<input placeholder={placeholder} value={value} oninput={onChange} type={type}/>
</div>;
