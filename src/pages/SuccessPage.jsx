import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Compra Realizada com Sucesso!</title>
        <meta name="description" content="Sua compra foi finalizada com sucesso." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 border text-center max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pagamento Aprovado!</h1>
          <p className="text-muted-foreground mb-8">
            Obrigado pela sua compra! Você receberá um e-mail de confirmação em breve com os detalhes do seu pedido.
          </p>
          <Button asChild size="lg">
            <Link to="/dashboard/store">Continuar Comprando</Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;