import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {
	

	return (
		<div>
			<h1>Thanks for your purchase</h1>
			
		</div>
	)
}

Success.getLayout = function getLayout(page, pageProps) {
	return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps (ctx) {
		const props = await getAppProps(ctx);
		return {
			props
		}
	}
});