'use client';

import PromoSlide from './components/PromoSlide';
import WinnersSection from './components/WinnersSection';
import CategorySection from './components/CategorySection';

export default function Home() {

  // Category-based competitions
  const categories = [
    {
      title: 'Mystery Boxes',
      icon: '🎁',
      gradient: 'from-purple-500 to-pink-500',
      competitions: [
        {
          id: 'mb-1',
          title: 'Crypto Mystery Box',
          category: 'crypto' as const,
          description: 'Unlock crypto rewards!',
          entryPrice: 2.50,
          prizePool: 15000,
          participants: 3421,
          timeRemaining: '4h 30m',
          prizes: [
            { name: '$5 BTC', rarity: 'common' as const, probability: 50, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%201_cqq0nBDZaN.png?updatedAt=1762502837441' },
            { name: '$25 ETH', rarity: 'rare' as const, probability: 30, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%202_7pNvz-mAQ.png?updatedAt=1762502837508' },
            { name: '$100 BTC', rarity: 'epic' as const, probability: 15, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%203_MwUvn7y34.png?updatedAt=1762502836841' },
            { name: '$500 Crypto', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201000gbp_jSoTSkL0PW.png?updatedAt=1762502837311' }
          ]
        },
        {
          id: 'mb-2',
          title: 'Luxury Mystery Box',
          category: 'luxury' as const,
          description: 'Surprise luxury items!',
          entryPrice: 8.00,
          prizePool: 40000,
          participants: 2134,
          timeRemaining: '6h 15m',
          prizes: [
            { name: 'Designer Item', rarity: 'rare' as const, probability: 40, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%205gbp_lhYe46Ty6I.png?updatedAt=1762502837188' },
            { name: 'Luxury Watch', rarity: 'epic' as const, probability: 35, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%2020gbp_Mx0lH6PXI.png?updatedAt=1762502837310' },
            { name: 'Diamond Jewelry', rarity: 'legendary' as const, probability: 25, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201000gbp_jSoTSkL0PW.png?updatedAt=1762502837311' }
          ]
        }
      ]
    },
    {
      title: 'Prize Spins',
      icon: '🎡',
      gradient: 'from-orange-500 to-yellow-500',
      competitions: [
        {
          id: 'ps-1',
          title: 'Gaming Spin',
          category: 'gaming' as const,
          description: 'Spin for gaming prizes!',
          entryPrice: 1.50,
          prizePool: 10000,
          participants: 6789,
          timeRemaining: '2h 45m',
          prizes: [
            { name: 'Game Credit', rarity: 'common' as const, probability: 45, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201gbp_3WMPEr7hA.png?updatedAt=1762502837312' },
            { name: 'Premium Skin', rarity: 'rare' as const, probability: 30, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%205gbp_lhYe46Ty6I.png?updatedAt=1762502837188' },
            { name: 'Gaming Bundle', rarity: 'epic' as const, probability: 20, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%2020gbp_Mx0lH6PXI.png?updatedAt=1762502837310' },
            { name: 'Console', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20fiat%20500_JTVt-vBTr.png?updatedAt=1762502836555' }
          ]
        },
        {
          id: 'ps-2',
          title: 'Tech Spin',
          category: 'electronics' as const,
          description: 'Win tech gadgets!',
          entryPrice: 3.50,
          prizePool: 20000,
          participants: 4567,
          timeRemaining: '5h 10m',
          prizes: [
            { name: 'Tech Accessory', rarity: 'common' as const, probability: 40, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'Tablet', rarity: 'rare' as const, probability: 35, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'Laptop', rarity: 'epic' as const, probability: 20, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'iPhone Pro', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' }
          ]
        }
      ]
    },
    {
      title: 'Instant Wins',
      icon: '💥',
      gradient: 'from-blue-500 to-cyan-500',
      competitions: [
        {
          id: 'iw-1',
          title: 'Quick Cash',
          category: 'crypto' as const,
          description: 'Instant cash prizes!',
          entryPrice: 1.00,
          prizePool: 5000,
          participants: 9876,
          timeRemaining: '1h 20m',
          prizes: [
            { name: '$2 Cash', rarity: 'common' as const, probability: 60, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%201_cqq0nBDZaN.png?updatedAt=1762502837441' },
            { name: '$10 Cash', rarity: 'rare' as const, probability: 25, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%202_7pNvz-mAQ.png?updatedAt=1762502837508' },
            { name: '$50 Cash', rarity: 'epic' as const, probability: 10, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%203_MwUvn7y34.png?updatedAt=1762502836841' },
            { name: '$200 Cash', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201000gbp_jSoTSkL0PW.png?updatedAt=1762502837311' }
          ]
        },
        {
          id: 'iw-2',
          title: 'Flash Wins',
          category: 'gaming' as const,
          description: 'Win prizes instantly!',
          entryPrice: 2.00,
          prizePool: 8000,
          participants: 7654,
          timeRemaining: '3h 05m',
          prizes: [
            { name: 'Small Prize', rarity: 'common' as const, probability: 50, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201gbp_3WMPEr7hA.png?updatedAt=1762502837312' },
            { name: 'Medium Prize', rarity: 'rare' as const, probability: 30, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%205gbp_lhYe46Ty6I.png?updatedAt=1762502837188' },
            { name: 'Big Prize', rarity: 'epic' as const, probability: 15, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%2020gbp_Mx0lH6PXI.png?updatedAt=1762502837310' },
            { name: 'Mega Prize', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20fiat%20500_JTVt-vBTr.png?updatedAt=1762502836555' }
          ]
        }
      ]
    },
    {
      title: 'Daily Prizes',
      icon: '🏆',
      gradient: 'from-green-500 to-emerald-500',
      competitions: [
        {
          id: 'dp-1',
          title: 'Daily Jackpot',
          category: 'luxury' as const,
          description: 'New jackpot daily!',
          entryPrice: 5.50,
          prizePool: 30000,
          participants: 4321,
          timeRemaining: '8h 40m',
          prizes: [
            { name: 'Daily Reward', rarity: 'common' as const, probability: 40, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%205gbp_lhYe46Ty6I.png?updatedAt=1762502837188' },
            { name: 'Premium Item', rarity: 'rare' as const, probability: 35, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%2020gbp_Mx0lH6PXI.png?updatedAt=1762502837310' },
            { name: 'Luxury Prize', rarity: 'epic' as const, probability: 20, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201000gbp_jSoTSkL0PW.png?updatedAt=1762502837311' },
            { name: 'Grand Prize', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20fiat%20500_JTVt-vBTr.png?updatedAt=1762502836555' }
          ]
        },
        {
          id: 'dp-2',
          title: 'Daily Tech Drop',
          category: 'electronics' as const,
          description: 'New tech every day!',
          entryPrice: 4.50,
          prizePool: 25000,
          participants: 5678,
          timeRemaining: '7h 25m',
          prizes: [
            { name: 'Tech Voucher', rarity: 'common' as const, probability: 45, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'Smart Device', rarity: 'rare' as const, probability: 30, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'Premium Tech', rarity: 'epic' as const, probability: 20, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' },
            { name: 'Latest Flagship', rarity: 'legendary' as const, probability: 5, imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="h-screen bg-black overflow-y-auto overflow-x-hidden">
      {/* Main Content Area - Scrollable */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-md mx-auto px-1 md:px-0 pt-4 pb-32 mb-8 space-y-4 overflow-x-hidden">
          {/* Promo Slide */}
          <div className="w-full overflow-hidden">
            <PromoSlide />
          </div>

          {/* Winners Section */}
          <div className="w-full overflow-hidden">
            <WinnersSection />
          </div>

          {/* Category Sections */}
          {categories.map((category) => (
            <div key={category.title} className="w-full overflow-hidden">
              <CategorySection
                title={category.title}
                icon={category.icon}
                gradient={category.gradient}
                competitions={category.competitions}
              />
            </div>
          ))}

          <div className='h-4'></div>
        </div>
      </main>
    </div>
  );
}
