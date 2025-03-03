'use client';

import React from 'react';
import styled from 'styled-components';
import { FaTools } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 178, 0.2);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(138, 43, 178, 0.05);
  max-width: 64rem;
  width: 100%;
`;

const Icon = styled(FaTools)`
  font-size: 5rem;
  color: #8A2BE2;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #8A2BE2;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #8A2BE2;
`;

const WIPPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 pb-8">

            <Card className="bg-black/40 backdrop-blur-md border-[#8A2BE2]/20 p-6 shadow-2xl shadow-[#8A2BE2]/50 max-w-4xl w-full">
                <Icon/>
                <Title>Work in Progress</Title>
                <Message>This page is currently under development. Please check back later.</Message>
            </Card>
        </div>
     );
    };

export default WIPPage;
